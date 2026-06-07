export default function Footer() {
  return (
    <footer className="border-t border-subtle py-8 px-6 lg:px-12 w-full pb-32 lg:pb-8 relative z-10">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 text-content-secondary text-sm">
        <span className="text-center lg:text-left">
          Built with React, TypeScript, Framer Motion and lots of coffee ☕
        </span>
        <span className="text-center lg:text-right">© {new Date().getFullYear()} · All rights reserved</span>
      </div>
    </footer>
  );
}
