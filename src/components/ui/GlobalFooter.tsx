import Image from "next/image";

export default function GlobalFooter() {
  return (
    <footer className="footer px-24 py-10 bg-primary text-primary-content mt-12">
      <Image src="/andamio.png" width={150} height={150} alt="andamio" className="rounded-full" />
      <nav>
        <header className="footer-title">SingularityNet</header>
        <a className="link link-hover">Discord</a>
        <a className="link link-hover">Twitter</a>
        <a className="link link-hover">Roadmap</a>
      </nav>
      <nav>
        <header className="footer-title">Deep Funding Academy</header>
        <a className="link link-hover">Discord</a>
        <a className="link link-hover">Linktree</a>
      </nav>
    </footer>
  );
}
