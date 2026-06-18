export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-6 py-9 sm:flex-row sm:px-12 lg:px-20">
        <span className="font-mono text-[13px] tracking-[0.04em] text-muted2">
          © {new Date().getFullYear()} VINAY KUMAR AGARWAL
        </span>
        <div className="flex gap-7">
          <a href="https://github.com/vinayaga97" target="_blank" rel="noreferrer" className="font-mono text-[13px] text-muted transition-colors hover:text-snow">
            GITHUB
          </a>
          <a href="https://www.linkedin.com/in/vinay-kumar-agarwal/" target="_blank" rel="noreferrer" className="font-mono text-[13px] text-muted transition-colors hover:text-snow">
            LINKEDIN
          </a>
          <a href="mailto:vka0797@gmail.com" className="font-mono text-[13px] text-muted transition-colors hover:text-snow">
            EMAIL
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="font-mono text-[13px] text-muted transition-colors hover:text-snow">
            RÉSUMÉ
          </a>
        </div>
      </div>
    </footer>
  );
}
