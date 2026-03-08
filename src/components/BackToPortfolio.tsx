export default function BackToPortfolio() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const portfolioUrl = `${basePath}/portfolio.html#projects`;
  
  return (
    <a 
      href={portfolioUrl} 
      style={{ 
        color: "#B7AB98", 
        fontSize: ".75rem", 
        letterSpacing: ".15em", 
        textDecoration: "none", 
        fontFamily: "'JetBrains Mono',monospace" 
      }}
    >
      ← BACK TO PORTFOLIO
    </a>
  );
}
