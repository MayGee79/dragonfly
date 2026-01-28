import styles from './WhyWorkWithMe.module.css'

const features = [
  {
    title: 'Safe space',
    description: 'to explore without judgment'
  },
  {
    title: 'Practical tools',
    description: 'that work in daily life'
  },
  {
    title: 'Whole-person understanding',
    description: 'your mind, body, and circumstances matter'
  },
  {
    title: 'Authentic care',
    description: "you'll feel heard, valued, and understood"
  },
  {
    title: 'True collaboration',
    description: 'your goals, your pace, your journey'
  }
]

export default function WhyWorkWithMe() {
  return (
    <section className={styles.section} id="why-work-with-me">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>Why work with me?</h2>
        <p className={styles.subtitle}>
          Deep Therapeutic Understanding, Enhanced by Medical Insight – A Unique Combination
        </p>
        
        <div className={styles.featureCardsWrap}>
          <h3 className={styles.featureHeading}>What I offer:</h3>
          <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <h4 className={styles.cardTitle}>{feature.title}</h4>
              <p className={styles.cardQuote}>{feature.description}</p>
            </div>
          ))}
          </div>
        </div>

        <div className={styles.content}>
          <p>
            As an integrative psychotherapist, I bring genuine warmth and psychological expertise to every session. What makes my approach unique? Twenty years as an NHS GP means I also understand the medical reality of what you're experiencing. This dual understanding enhances our work, aiming for more effective therapy.
          </p>
          
          <p>
            You're already being strong just by considering reaching out. In our work together, there's no judgement, no pressure to be 'fixed,' and no timeline you need to follow. This is your safe space to be exactly where you are, to feel what you're feeling, and to gently explore what comes next. I'm here to walk alongside you with warmth and understanding as you write your next chapter - one filled with greater clarity, self-compassion, and hope.
          </p>
          
          <p>
            If you choose to work with me, you're not just getting a therapist - you're gaining a genuine ally on your journey. Clients have told me how much they value feeling truly seen and heard. One client recently shared:
          </p>
          
          <blockquote className={styles.testimonial}>
            "You have been an incredible support for me. I will never forget you Vicky"
          </blockquote>
          
          <p>
            And these words stay with me, as a reminder of why my work matters.
          </p>

          <p>
            Clients mention three main things about working with me: First, they feel safe to explore difficult emotions without judgment. Second, they appreciate that I don't just listen, I help them develop practical tools they can actually use in their daily lives.
          </p>

          <p>
            As examples, whether the client has anxiety, depression, difficulties at school or home or is suffering as a result of hormone changes in the menopause I aim to equip them in ways to allow them to move forwards. As one client put it:
          </p>
          
          <blockquote className={styles.testimonial}>
            "I feel like I have the tools to keep going with it now"
          </blockquote>

          <p>
            And third, they value the genuine warmth and connection we build together, which becomes the foundation for real change.
          </p>

          <p>
            Whether you're navigating a specific crisis or feeling generally stuck, my clients find that our sessions offer both immediate relief and lasting clarity and transformation. They sometimes express surprise at how helpful therapy can be:
          </p>
          
          <blockquote className={styles.testimonial}>
            "These sessions have been so helpful, I so appreciate it"
          </blockquote>
          
          <p>
            - especially when they've been hesitant about reaching out to start with.
          </p>

          <p>
            I understand that choosing a therapist is a big decision. You want someone who truly gets it, someone who can hold space for your struggles whilst also helping you find your way forwards. My clients choose me because they sense that I genuinely care about their wellbeing and bring both professional expertise and heartfelt compassion to every session. And the support that I offer isn't just for the therapy room - it's about empowering you with insights and strategies that become part of your everyday toolkit for wellbeing.
          </p>
        </div>
      </div>
    </section>
  )
}
