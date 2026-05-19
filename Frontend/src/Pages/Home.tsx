import { useEffect, useRef, useState } from "react";
const Home = () => {
  type ShortUrlType = {
    full: string;
    short: string;
    clicks: number;
  };
  const [shortUrls, setShortUrls] = useState<ShortUrlType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchUrls = () => {
    fetch("http://localhost:5000/shortUrls")
      .then((res) => res.json())
      .then((data) => setShortUrls(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    document.title = "Home";
    fetchUrls();
  }, []);

   async function createShortUrl(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    await fetch("http://localhost:5000/shortUrls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullUrl: inputRef.current.value })
    });
    inputRef.current.value = "";
    fetchUrls(); 
  }

  return (
    <div className="container">
      <h1>URL Shortener</h1>

      <form onSubmit={createShortUrl}>
        <label className="notstyled">
          Full URL
          <br />
          <input ref={inputRef} type="url" name="FullURL" id="FullURL" required />
        </label>

        <button type="submit">Submit</button>
      </form>

      <div className="table-grid">
        <div className="grid-header">Full URL</div>
        <div className="grid-header">Short URL</div>
        <div className="grid-header">Clicks</div>

        {shortUrls.map((shortUrl, index) => (
          <div key={index} style={{ display: "contents" }}>
            <div className="grid-cell">
              <a href={shortUrl.full}>{shortUrl.full}</a>
            </div>
            <div className="grid-cell">
              <a href={`http://localhost:5000/${shortUrl.short}`}>{shortUrl.short}</a>
            </div>
            <div className="grid-cell">{shortUrl.clicks}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
