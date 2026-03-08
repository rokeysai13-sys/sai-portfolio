import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
    window.location.href = base + "portfolio.html";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting to portfolio...</p>
      </div>
    </div>
  );
};

export default Index;
