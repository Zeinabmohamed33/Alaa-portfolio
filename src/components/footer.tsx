import { profile } from "@/data/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
