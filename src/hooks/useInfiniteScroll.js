import { useEffect } from "react";

export default function useInfiniteScroll(onBottom, loading, error) {
  useEffect(() => {
    const onScroll = () => {
      if (loading || error) return;
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight)
        onBottom();
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [onBottom, loading, error]);
}
