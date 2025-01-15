import { useEffect, useState } from "react";

export default function TweetButton(props) {
  const { tweet } = props;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.twttr = (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function (f) {
        t._e.push(f);
        setReady(true);
      };
      return t;
    })(document, "script", "twitter-wjs");
  }, []);

  return (
    <a
      className="twitter-share-button"
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweet
      )}&url=${location.protocol + "//" + location.host}`}
      data-size="large"
      style={{ pointerEvents: ready ? null : "none" }}
    >
      Share on Twitter
    </a>
  );
}
