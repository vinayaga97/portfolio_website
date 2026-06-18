import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav className="w-full border-b border-line">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-6 sm:px-12 lg:px-20">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-gradient-to-br from-pink to-pink-soft text-[13px] font-bold text-onaccent">
            V
          </span>
          <span className="font-mono text-[13px] font-medium tracking-[0.04em] text-snow">
            vinayagarwal.com
          </span>
        </a>
        <div className="flex items-center gap-6 sm:gap-9">
          <a href="/#work" className="hidden font-mono text-[13px] tracking-[0.06em] text-muted transition-colors hover:text-snow sm:block">
            WORK
          </a>
          <a href="/projects" className="hidden font-mono text-[13px] tracking-[0.06em] text-muted transition-colors hover:text-snow sm:block">
            PROJECTS
          </a>
          <a href="/#about" className="hidden font-mono text-[13px] tracking-[0.06em] text-muted transition-colors hover:text-snow sm:block">
            ABOUT
          </a>
          <a href="/#stack" className="hidden font-mono text-[13px] tracking-[0.06em] text-muted transition-colors hover:text-snow sm:block">
            STACK
          </a>
          <div className="hidden items-center gap-2 rounded-[20px] border border-line bg-surface px-3.5 py-2 sm:flex">
            <span className="h-[7px] w-[7px] rounded-full bg-mint shadow-[0_0_8px_#5EE6C4]" />
            <span className="font-mono text-[12px] tracking-[0.04em] text-snow">
              3 AGENTS ONLINE
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
