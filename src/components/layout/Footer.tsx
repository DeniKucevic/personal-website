import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="mx-auto max-w-4xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Denis Kucevic</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/DeniKucevic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/denis-kucevic/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
          <Link href="mailto:denikucevic@gmail.com" className="hover:text-foreground transition-colors">
            Email
          </Link>
        </div>
      </div>
    </footer>
  )
}
