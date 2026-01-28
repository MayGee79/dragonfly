import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './privacy-policy.module.css'

export function generateStaticParams() {
  return []
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Privacy Notice</h1>
            <p className={styles.lastUpdated}>Last updated: January 2026</p>

            <div className={styles.content}>
              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>Introduction</h2>
                <p>
                  Your privacy matters to me. This notice explains how I collect, use, and protect your
                  personal information when you use my services, visit my website, or interact with me
                  in any way.
                </p>
                <p>
                  I provide psychotherapy services, wellness walks, in-person workshops, online CPD
                  training, and therapeutic resources. This privacy notice covers all of these activities.
                </p>
                <p>
                  I follow the UK General Data Protection Regulation (UK GDPR), the Data Protection
                  Act 2018, and my professional codes of conduct (BACP and UKCP).
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>1. Who I Am</h2>
                <p>
                  I am the data controller for the personal information you provide. This means I
                  decide how your data is used and I am responsible for keeping it safe.
                </p>
                <ul className={styles.list}>
                  <li><strong>Name:</strong> Victoria Froome</li>
                  <li><strong>Trading as:</strong> Dragonfly Psychotherapy</li>
                  <li><strong>Address:</strong> Guildford Therapy Rooms, 3 Beaufort, Railton Road, Guildford, Surrey GU2 9JX</li>
                  <li><strong>Phone:</strong> 07546 431 448</li>
                  <li><strong>Email:</strong> victoria@dragonflypsychotherapy.co.uk</li>
                  <li><strong>Website:</strong> www.dragonflypsychotherapy.co.uk</li>
                  <li><strong>ICO Registration:</strong> ZB904048</li>
                </ul>
                <p>
                  If you have any questions about this notice or how I handle your data, please get in
                  touch using the details above.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>2. Why I Can Use Your Data (Lawful Basis)</h2>
                <p>
                  Data protection law requires me to have a valid reason for processing your personal
                  information. Depending on what we are doing together, I rely on different lawful
                  bases:
                </p>
                <ul className={styles.list}>
                  <li><strong>Contract:</strong> When you book therapy sessions, wellness walks, or purchase resources,
                  I process your data to provide those services to you.</li>
                  <li><strong>Legitimate Interests:</strong> I keep records to meet my professional and insurance
                  obligations, and to respond to any legal claims. I also use your data to run my
                  practice effectively.</li>
                  <li><strong>Consent:</strong> For sensitive information (such as health information shared in therapy), I
                  ask for your explicit consent. I also ask consent before using your image in
                  photographs or sending you marketing communications.</li>
                  <li><strong>Legal Obligation:</strong> Sometimes I am required by law to share information, for
                  example for safeguarding purposes.</li>
                </ul>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>3. What Information I Collect</h2>
                <p>The information I collect depends on which of my services you use.</p>

                <h3 className={styles.subheading}>Therapy Clients</h3>
                <p>When you come to me for therapy, I collect:</p>
                <ul className={styles.list}>
                  <li>Your name, contact details (phone, email, address), date of birth, and emergency
                  contact information. I also record your GP details.</li>
                  <li>Brief session notes about our work together. These are factual and anonymised
                  where possible.</li>
                  <li>Information about your mental health and wellbeing that you share with me during
                  our sessions. This is classed as sensitive (special category) data and I ask for your
                  explicit consent to hold it.</li>
                  <li>Any correspondence between us, including emails, text messages, and messages
                  through my website or social media.</li>
                  <li>If you are referred by another professional (such as your GP) or by someone you
                  know, I may receive some information from them.</li>
                </ul>

                <h3 className={styles.subheading}>Wellness Walk Participants</h3>
                <p>When you book a wellness walk, I collect:</p>
                <ul className={styles.list}>
                  <li>Your name, contact details, and emergency contact information.</li>
                  <li>Any relevant health information you choose to share that might affect your
                  participation (for example, mobility considerations). This is sensitive data and I ask for your
                  consent.</li>
                  <li>Booking and payment information.</li>
                  <li>Photographs taken during walks, but only with your consent. I will always ask before
                  using any images for marketing or social media.</li>
                </ul>
                <p>
                  <strong>Please note:</strong> Initially, bookings for wellness walks are handled through the venue
                  (East Horsley Place). Their privacy notice will apply to the booking process. Once
                  you attend a walk, this privacy notice applies to any information I collect directly.
                </p>

                <h3 className={styles.subheading}>Resource Purchasers</h3>
                <p>When you purchase resources (such as guides, workbooks, or other materials), I
                collect:</p>
                <ul className={styles.list}>
                  <li>Your name, email address, and delivery address (for physical products).</li>
                  <li>Payment information. I do not store your full card details – these are processed
                  securely by my payment provider.</li>
                  <li>Your purchase history so I can provide customer support and, if you have opted in,
                  let you know about related resources.</li>
                  <li>If you purchase through Amazon, Amazon's privacy policy applies to that
                  transaction. I receive limited information from Amazon to fulfil your order.</li>
                </ul>

                <h3 className={styles.subheading}>Online CPD Participants</h3>
                <p>When you register for or purchase online CPD (continuing professional
                development) sessions, I collect:</p>
                <ul className={styles.list}>
                  <li>Your name, email address, and professional details (such as your profession,
                  employer, and professional registration number if you need a CPD certificate).</li>
                  <li>Payment information. I do not store your full card details – these are processed
                  securely by my payment provider.</li>
                  <li>Records of which sessions you have completed, including dates and times. This is
                  necessary to issue CPD certificates and to provide evidence of your learning if
                  required by your professional body.</li>
                  <li>Any feedback or evaluation responses you provide.</li>
                  <li>Technical information about how you access the content (such as device type and
                  viewing duration) to help me improve the learning experience.</li>
                </ul>

                <h3 className={styles.subheading}>In-Person Workshop Participants</h3>
                <p>When you book an in-person workshop or training event, I collect:</p>
                <ul className={styles.list}>
                  <li>Your name, contact details, and emergency contact information.</li>
                  <li>Professional details (such as your profession, employer, and professional
                  registration number) if you need a CPD certificate.</li>
                  <li>Any dietary requirements, accessibility needs, or health information you choose to
                  share to help me accommodate you. This may include sensitive data, and I ask for
                  your consent to hold it.</li>
                  <li>Payment and booking information.</li>
                  <li>Attendance records, which are necessary for issuing CPD certificates.</li>
                  <li>Photographs taken during workshops, but only with your consent. I will always ask
                  before using any images for marketing or social media.</li>
                  <li>Any feedback or evaluation responses you provide.</li>
                </ul>

                <h3 className={styles.subheading}>Website Visitors</h3>
                <p>When you visit my website, I may collect:</p>
                <ul className={styles.list}>
                  <li>Technical information such as your IP address, browser type, and which pages you
                  visit. This helps me understand how people use the site and improve it.</li>
                  <li>Information you provide through contact forms or enquiry forms.</li>
                  <li>Cookie data (see the Cookies section below).</li>
                </ul>

                <h3 className={styles.subheading}>General Enquiries</h3>
                <p>
                  If you contact me with an enquiry but do not go on to use my services, I keep your
                  contact details and our correspondence for up to one month, then delete them
                  (unless you ask me to delete them sooner).
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>4. How I Use Your Information</h2>
                <p>I use your information to:</p>
                <ul className={styles.list}>
                  <li>Provide the services you have asked for (therapy, wellness walks, resources).</li>
                  <li>Communicate with you about appointments, bookings, and purchases.</li>
                  <li>Keep appropriate professional records.</li>
                  <li>Meet my legal, regulatory, and professional obligations.</li>
                  <li>Send you information about my services, but only if you have opted in to receive
                  marketing.</li>
                  <li>Improve my website and services.</li>
                </ul>
                <p>I do not use automated decision-making or profiling with your personal data.</p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>5. Sensitive Information (Special Category Data)</h2>
                <p>
                  Some of the information I collect is classed as sensitive or "special category" data
                  under data protection law. This includes information about your physical or mental
                  health.
                </p>
                <p>
                  For therapy clients, I need to collect this information to provide my services
                  effectively and safely. I ask for your explicit consent to process this data when we
                  begin working together.
                </p>
                <p>
                  For wellness walk participants, I may ask about health conditions that could affect
                  your participation. You can choose what to share, and I ask for your consent to hold
                  any health information you do provide.
                </p>
                <p>
                  You can withdraw your consent at any time, though this may affect my ability to
                  continue providing services to you.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>6. Young People</h2>
                <p>
                  I work with young people aged 11 and over. When working with anyone under 18, I
                  involve parents or guardians appropriately while respecting the young person's
                  developing autonomy and right to confidentiality.
                </p>
                <p>
                  For young people under 13 who use my website or services, I require parental
                  consent before collecting their personal information.
                </p>
                <p>
                  I keep records for young people until they reach the age of 25, or for seven years
                  after our work ends, whichever is longer.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>7. Confidentiality</h2>
                <p>
                  Confidentiality is fundamental to my work. What you share with me stays between
                  us, except in certain limited circumstances where I may need to share information:
                </p>
                <ul className={styles.list}>
                  <li>If you disclose involvement in, or knowledge of, terrorism, money laundering, or drug
                  trafficking.</li>
                  <li>If there is a serious risk of harm to yourself or others.</li>
                  <li>If there is a safeguarding concern involving a child or vulnerable adult.</li>
                  <li>If I am required by law or a court order to share information.</li>
                </ul>
                <p>
                  I will always try to discuss this with you first, unless doing so would put someone at
                  risk.
                </p>
                <p>
                  I have regular clinical supervision, which is a professional requirement. I discuss my
                  work in supervision to ensure I am providing safe and effective support. I do not
                  share identifying information about you unless there is a safeguarding concern.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>8. How I Keep Your Information Safe</h2>
                <p>I take the security of your information seriously:</p>
                <ul className={styles.list}>
                  <li>Paper records are stored in a locked filing cabinet in a locked room.</li>
                  <li>Digital records are stored on password-protected, encrypted devices. I use secure,
                  encrypted systems for client records.</li>
                  <li>Emails and texts: I delete text messages after one week (with any relevant
                  information saved in your records). Unnecessary emails are deleted after one week.</li>
                  <li>Backups are made securely and stored in compliance with UK GDPR.</li>
                  <li>I use strong passwords and keep my devices and software up to date.</li>
                </ul>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>9. Who I Share Your Information With</h2>
                <p>I do not sell your information or share it for marketing purposes.</p>
                <p>I may share your information with:</p>
                <ul className={styles.list}>
                  <li>Service providers who help me run my practice, such as secure practice
                  management software, cloud storage, website hosting, email marketing platforms, or
                  booking systems. These providers are under strict contracts and cannot use your
                  data for any other purpose.</li>
                  <li>Payment processors (such as Stripe, PayPal, or similar) who handle transactions
                  securely.</li>
                  <li>Professional advisers such as accountants or lawyers, where necessary.</li>
                  <li>Regulatory bodies or government agencies, if required by law.</li>
                </ul>
                <p>
                  Some of my service providers may be based outside the UK. Where this is the case,
                  I ensure appropriate safeguards are in place to protect your data, such as using
                  providers who are certified under approved data protection frameworks or who have
                  signed standard contractual clauses.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>10. How Long I Keep Your Information</h2>
                <p>I only keep your information for as long as I need it:</p>
                <ul className={styles.list}>
                  <li><strong>Therapy records:</strong> Seven years from the end of our work together. If you were under
                  18 when we finished, I keep records until you reach 25 or for seven years, whichever
                  is longer.</li>
                  <li><strong>Wellness walk records:</strong> Seven years from the date of the walk, in line with
                  insurance requirements.</li>
                  <li><strong>Resource purchase records:</strong> Six years after the transaction, for tax and accounting
                  purposes.</li>
                  <li><strong>CPD records:</strong> Six years after the session, to allow you to evidence your learning to
                  professional bodies and for tax purposes.</li>
                  <li><strong>Workshop records:</strong> Six years after the event, to allow you to evidence your learning
                  to professional bodies and for tax purposes.</li>
                  <li><strong>General enquiries:</strong> One month if you do not proceed with services.</li>
                  <li><strong>Marketing preferences:</strong> Until you unsubscribe, plus a record of your opt-out to
                  ensure I respect your wishes.</li>
                </ul>
                <p>After these periods, I securely delete or destroy your information.</p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>11. Your Rights</h2>
                <p>You have rights over your personal information. You can:</p>
                <ul className={styles.list}>
                  <li>Access the information I hold about you.</li>
                  <li>Correct any inaccurate or incomplete information.</li>
                  <li>Request deletion of your information in certain circumstances.</li>
                  <li>Restrict how I use your information.</li>
                  <li>Object to certain types of processing.</li>
                  <li>Request a copy of your information in a portable format.</li>
                  <li>Withdraw consent at any time (where I am relying on consent to process your
                  data).</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact me using the details at the top of this
                  notice. I will respond within one month.
                </p>
                <p>
                  You also have the right to complain to the Information Commissioner's Office (ICO) if
                  you are unhappy with how I handle your data. Their website is www.ico.org.uk. I
                  would be grateful if you contacted me first so I can try to resolve any concerns.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>12. Marketing Communications</h2>
                <p>
                  I will only send you marketing information (such as newsletters, updates about new
                  resources, or information about events) if you have specifically opted in.
                </p>
                <p>
                  You can unsubscribe at any time by clicking the unsubscribe link in any email, or by
                  contacting me directly.
                </p>
                <p>
                  If you have previously purchased resources from me, I may send you information
                  about similar products or services, but you can opt out at any time.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>13. Cookies</h2>
                <p>
                  My website uses cookies, which are small files stored on your device that help the
                  site work properly.
                </p>
                <ul className={styles.list}>
                  <li><strong>Essential cookies:</strong> These are necessary for the website to function. They do not
                  collect personal information about you. My site currently uses only essential
                  cookies and does not use analytics or other non-essential cookies.</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. If I introduce analytics
                  or other non-essential cookies in future, I will ask for your consent before
                  they are placed on your device, and I will update this notice accordingly. You
                  can opt out of Google Analytics at any time at tools.google.com/dlpage/gaoptout.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>14. Data Breaches</h2>
                <p>
                  In the unlikely event of a data breach that poses a risk to your rights and freedoms, I
                  will inform the ICO within 72 hours and will notify you as soon as possible.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>15. Links to Other Websites</h2>
                <p>
                  My website may contain links to other websites. I am not responsible for the privacy
                  practices of other sites. I encourage you to read the privacy notice of any website
                  you visit.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>16. Changes to This Notice</h2>
                <p>
                  I may update this privacy notice from time to time. The date at the top shows when it
                  was last updated. For significant changes, I will let you know directly where possible.
                </p>
              </section>

              <section className={styles.sectionContent}>
                <h2 className={styles.heading}>17. Questions and Concerns</h2>
                <p>
                  If you have any questions about this notice, or if you want to exercise any of your
                  rights, please contact me:
                </p>
                <ul className={styles.list}>
                  <li><strong>Email:</strong> victoria@dragonflypsychotherapy.co.uk</li>
                  <li><strong>Phone:</strong> 07546 431 448</li>
                  <li><strong>Post:</strong> Dragonfly Psychotherapy, Guildford Therapy Rooms, 3 Beaufort, Railton
                  Road, Guildford, Surrey GU2 9JX</li>
                </ul>
                <p>
                  Thank you for taking the time to read this privacy notice. I want you to feel confident
                  that your information is safe with me.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
