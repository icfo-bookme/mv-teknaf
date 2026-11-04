import Image from "next/image";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.scene} aria-label="Loading MV Teknaf">
      <div className={styles.loader} role="status" aria-live="polite" aria-atomic="true">
        <div className={styles.mark} aria-hidden="true">
          <span className={styles.ring} />
          <span className={styles.orbit} />
          <Image
            className={styles.ship}
            src="/mv-logo.png"
            alt=""
            width={818}
            height={442}
            style={{ width: 100, height: "auto" }}
            priority
          />
          <div className={styles.water}>
            <svg viewBox="0 0 146 10">
              <path d="M0 5 Q9 -1 18 5 T36 5 T54 5 T73 5 T91 5 T109 5 T127 5 T146 5" fill="none" stroke="#78aaba" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <p className={styles.brand}>MV TEKNAF</p>
        <h1 className={styles.heading}>Preparing your journey</h1>
        <p className={styles.copy}>Loading cruise details. Please wait a moment.</p>
        <div className={styles.track} aria-hidden="true"><span /></div>
      </div>
      <svg className={styles.sea} viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 80 Q240 5 500 80 T1020 80 T1540 80" />
        <path d="M-20 100 Q240 25 500 100 T1020 100 T1540 100" />
        <path d="M-20 120 Q240 45 500 120 T1020 120 T1540 120" />
      </svg>
      <p className={styles.foot} aria-hidden="true">TEKNAF &nbsp; / &nbsp; SAINT MARTIN&apos;S ISLAND</p>
    </main>
  );
}
