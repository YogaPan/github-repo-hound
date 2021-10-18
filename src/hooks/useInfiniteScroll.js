import { useEffect } from "react";

export default function useInfiniteScroll(onBottom, loading) {
  useEffect(() => {
    const onScroll = () => {
      if (loading) return;
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight)
        onBottom();
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [loading, onBottom]);
}
