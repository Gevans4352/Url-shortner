import { useEffect, useRef, useState } from "react";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";

const Home = () => {
  type ShortUrlType = {
    full: string;
    short: string;
    clicks: number;
  };
  const API = "https://url-shortner-c1kw.onrender.com";
  const [shortUrls, setShortUrls] = useState<ShortUrlType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  useDocumentTitle("Home");

  const fetchUrls = () => {
    fetch(`${API}/shortUrls`)
      .then((res) => res.json())
      .then((data) => setShortUrls(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  async function createShortUrl(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    await fetch(`${API}/shortUrls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullUrl: inputRef.current.value }),
    });
    inputRef.current.value = "";
    fetchUrls();
  }

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form className="HomeForm" onSubmit={createShortUrl}>
        <label className="notstyled">
          Full URL
          <br />
          <input
            className="HomeInput"
            ref={inputRef}
            type="url"
            name="FullURL"
            id="FullURL"
            required
          />
        </label>
        <button className="HomeSubmit" type="submit">
          Submit
        </button>
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
              <a
                href={`${API}/${shortUrl.short}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setTimeout(fetchUrls, 2000)}
              >
                {shortUrl.short}
              </a>
            </div>
            <div className="grid-cell">{shortUrl.clicks}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
