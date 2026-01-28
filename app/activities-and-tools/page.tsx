import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './activities-and-tools.module.css'

const activities = [
  {
    title: 'Anxiety Self Help',
    description: 'Practical tools to help you feel more in control.',
    link: '#understanding-anxiety'
  },
  {
    title: 'Mindfulness',
    description: 'A gentle introduction to being present.',
    link: '#mindfulness'
  },
  {
    title: 'Confidence and Resilience',
    description: 'Building your capacity to cope and grow.',
    link: '#what-is-resilience'
  },
  {
    title: 'Printable resources',
    description: 'Downloads and worksheets to support your practice.',
    link: '#printable-resources'
  }
]

export function generateStaticParams() {
  return []
}

export default function ActivitiesAndToolsPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Activities and Tools</h1>

            <div className={styles.grid}>
              {activities.map((activity, index) => (
              <a key={index} href={activity.link} className={styles.activityCard}>
                <h2 className={styles.cardTitle}>{activity.title}</h2>
                <p className={styles.cardQuote}>{activity.description}</p>
                <span className={styles.cardLink}>Learn more →</span>
              </a>
              ))}
            </div>
          </div>
        </section>

        <section id="understanding-anxiety" className={styles.contentSection}>
          <div className={styles.contentSectionInner}>
            <h2 className={styles.contentTitle}>Understanding &amp; Managing Anxiety</h2>
                <p className={styles.contentIntro}>
                  Anxiety is exhausting. If you&apos;re living with it, you already know how much energy it takes — the racing thoughts, the physical tension, the constant sense of dread or &quot;what if&quot;. The good news is that anxiety responds well to the right strategies. This guide offers some practical tools to help you feel more in control.
                </p>

                <h3 className={styles.subheading}>What&apos;s Actually Happening</h3>
                <p className={styles.contentBody}>
                  Anxiety is your brain&apos;s threat-detection system working overtime. It evolved to keep us safe from danger, but in modern life it often fires when there&apos;s no real threat — just uncertainty, stress, or things we can&apos;t control. Your body responds as if there&apos;s a tiger in the room: heart racing, muscles tense, breathing shallow, mind scanning for danger. It&apos;s not a sign of weakness or failure — it&apos;s a misfiring alarm system, and we can learn to calm it down.
                </p>

                <h3 className={styles.subheading}>You Might Notice</h3>
                <p className={styles.contentBody}>
                  Racing or intrusive thoughts, difficulty concentrating, a sense of dread, restlessness, muscle tension, disrupted sleep, a pounding heart, shallow breathing, sweating, or an urge to avoid situations that feel threatening. Anxiety can also show up as irritability, perfectionism, or an overwhelming need for control.
                </p>

                <h3 className={styles.subheading}>Calming Your Nervous System</h3>
                <p className={styles.contentBody}>
                  <strong>Slow breathing</strong> is one of the fastest ways to signal safety to your brain. Try breathing in for 4 counts, holding for 4, and out for 6–8 counts. The longer exhale activates your body&apos;s relaxation response. Do this for a minute or two when you notice anxiety rising.
                </p>
                <p className={styles.contentBody}>
                  <strong>Grounding</strong> brings you back to the present. Try the 5-4-3-2-1 technique: notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This interrupts the spiral of anxious thinking.
                </p>
                <p className={styles.contentBody}>
                  <strong>Progressive muscle relaxation</strong> helps release physical tension. Working from your feet upwards, tense each muscle group for 5 seconds, then release. Notice the contrast between tension and relaxation. This teaches your body what &quot;calm&quot; actually feels like.
                </p>

                <h3 className={styles.subheading}>Working With Anxious Thoughts</h3>
                <p className={styles.contentBody}>
                  Anxious thoughts often feel absolutely true and urgent. But thoughts are not facts. When you notice an anxious thought, try asking: Is this definitely true? What&apos;s the evidence? What would I say to a friend thinking this? What&apos;s the most likely outcome (not the worst)?
                </p>
                <p className={styles.contentBody}>
                  You don&apos;t have to believe every thought your mind produces. Sometimes the most helpful thing is simply to notice: &quot;There&apos;s that anxious thought again&quot; — and let it pass without engaging with it.
                </p>

                <h3 className={styles.subheading}>Daily Habits That Help</h3>
                <p className={styles.contentBody}>
                  Movement matters — even a 20-minute walk can reduce anxiety significantly. Limit caffeine and alcohol, which both worsen anxiety symptoms. Prioritise sleep (anxiety and poor sleep feed each other). Stay connected with people who support you. And be gentle with yourself — managing anxiety is hard work.
                </p>

                <h3 className={styles.subheading}>When Self-Help Isn&apos;t Enough</h3>
                <p className={styles.contentBody}>
                  These strategies can help, but sometimes anxiety needs more than self-help. If anxiety is significantly affecting your work, relationships, or quality of life — or if you&apos;re experiencing panic attacks, avoiding situations, or feeling unable to cope — therapy can make a real difference. As a former NHS GP turned psychotherapist, I understand anxiety from both a medical and psychological perspective, and I&apos;d be glad to help.
                </p>

                <h3 className={styles.subheading}>Helpful Resources</h3>
                <p className={styles.contentBody}>
                  <a href="https://www.mind.org.uk/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>Mind</a>
                  <br />
                  <a href="https://anxietyuk.org.uk" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>Anxiety UK</a>
                  <br />
                  <em>The Anxiety and Phobia Workbook</em> by Edmund Bourne
                  <br />
                  apps like Headspace or Calm for guided exercises.
                </p>
          </div>
        </section>

        <section id="what-is-resilience" className={`${styles.contentSection} ${styles.contentSectionLight}`}>
          <div className={styles.contentSectionInner}>
            <h2 className={styles.contentTitle}>What is Resilience?</h2>
            <p className={styles.contentIntro}>
              Resilience is the ability to adapt and bounce back when faced with adversity, stress, or challenging life events. It is not about avoiding difficulties, but rather about developing the capacity to cope, recover, and even grow stronger as a result of life&apos;s setbacks. Building resilience involves enhancing emotional strength, improving problem-solving skills, and maintaining a positive mindset in difficult situations.
            </p>

            <h3 className={styles.subheading}>Why is Resilience Important?</h3>
            <ul className={styles.contentList}>
              <li><strong>Emotional Well-being:</strong> Resilience helps you manage stress, regulate emotions, and maintain a sense of control when life feels overwhelming.</li>
              <li><strong>Improved Mental Health:</strong> Being resilient reduces the impact of anxiety, depression, and other mental health challenges.</li>
              <li><strong>Better Relationships:</strong> Resilient individuals tend to have healthier relationships, as they are better equipped to communicate, problem-solve, and handle conflicts.</li>
              <li><strong>Increased Confidence:</strong> Building resilience helps you trust in your own ability to navigate tough situations, boosting self-esteem and confidence.</li>
              <li><strong>Personal Growth:</strong> Resilience can lead to increased self-awareness and personal development as you learn from life&apos;s challenges.</li>
            </ul>

            <h3 className={styles.subheading}>Key Factors that Influence Resilience</h3>
            <ul className={styles.contentList}>
              <li><strong>Social Support:</strong> Having strong, supportive relationships with family, friends, or community groups can provide emotional support and practical help during tough times.</li>
              <li><strong>Positive Thinking:</strong> Cultivating an optimistic outlook and focusing on strengths and solutions rather than obstacles can boost resilience.</li>
              <li><strong>Self-Awareness:</strong> Understanding your own emotional responses, thoughts, and behaviours can help you manage reactions in stressful situations.</li>
              <li><strong>Flexibility:</strong> Being open to change, learning from experience, and adapting to new circumstances are critical components of resilience.</li>
              <li><strong>Self-Care:</strong> Physical health, proper sleep, nutrition, and relaxation practices can contribute significantly to emotional resilience.</li>
              <li><strong>Purpose and Meaning:</strong> Having a sense of purpose in life or a clear set of values can help you stay grounded during times of uncertainty.</li>
            </ul>

            <h3 className={styles.subheading}>How to Build Resilience</h3>
            <ul className={styles.contentList}>
              <li><strong>Develop a Growth Mindset:</strong> Embrace challenges as opportunities for growth. Instead of seeing failure as a setback, view it as a chance to learn and improve.</li>
              <li><strong>Strengthen Relationships:</strong> Reach out to trusted friends, family, or support groups for emotional support. Feeling connected to others can help reduce isolation and stress.</li>
              <li><strong>Set Realistic Goals:</strong> Break down large challenges into smaller, manageable steps, and celebrate progress along the way.</li>
              <li><strong>Practice Self-Compassion:</strong> Be kind to yourself during difficult times. Acknowledge your feelings without judgment and allow yourself time to recover.</li>
              <li><strong>Mindfulness and Relaxation:</strong> Engage in mindfulness practices, meditation, or deep breathing exercises to stay grounded and calm during stressful moments.</li>
              <li><strong>Seek Professional Help:</strong> Working with a therapist or counsellor can provide additional tools and strategies for managing stress and building resilience.</li>
            </ul>

            <h3 className={styles.subheading}>Common Myths About Resilience</h3>
            <p className={styles.contentBody}>
              <strong>Resilience Means Never Feeling Stressed:</strong> It&apos;s natural and normal to experience stress and difficulties; resilience is about how you respond to them, not avoiding them.
            </p>
            <p className={styles.contentBody}>
              <strong>Resilience is Something You Are Born With:</strong> While some people may have traits that make resilience easier, everyone can develop and strengthen their resilience over time.
            </p>
            <p className={styles.contentBody}>
              <strong>Resilience Means Being Strong All the Time:</strong> Being resilient doesn&apos;t mean suppressing emotions or pushing through every challenge without difficulty. It&apos;s about recognising when to reach out for support and take care of yourself.
            </p>

            <h3 className={styles.subheading}>How Resilience and Confidence Work Together</h3>
            <p className={styles.contentBody}>
              Resilience helps you stay grounded when life gets hard. Confidence gives you the belief that you can face those challenges. Together, they help you feel more in control, more hopeful, and more capable of facing life&apos;s ups and downs.
            </p>

            <h3 className={styles.subheading}>Common Myths</h3>
            <ul className={styles.mythList}>
              <li><span className={styles.mythWrong}>False: &quot;Confident people never doubt themselves.&quot;</span><br /><span className={styles.mythRight}>True: Everyone has doubts—confidence means acting despite them.</span></li>
              <li><span className={styles.mythWrong}>False: &quot;Resilience means staying positive all the time.&quot;</span><br /><span className={styles.mythRight}>True: Resilience includes feeling your emotions and still moving forward.</span></li>
              <li><span className={styles.mythWrong}>False: &quot;Some people are just born confident/resilient.&quot;</span><br /><span className={styles.mythRight}>True: These are skills. You can develop and strengthen them.</span></li>
            </ul>

            <h3 className={styles.subheading}>Practical Tips to Build Resilience</h3>
            <ul className={styles.contentList}>
              <li><strong>Name the challenge</strong> – Acknowledge what you&apos;re facing rather than avoiding it.</li>
              <li><strong>Practice self-compassion</strong> – Speak to yourself as you would to a friend.</li>
              <li><strong>Strengthen connections</strong> – Talk to others, ask for support, and stay connected.</li>
              <li><strong>Create routine and structure</strong> – Consistency helps you feel grounded.</li>
              <li><strong>Focus on what you can control</strong> – Even small steps count.</li>
            </ul>

            <h3 className={styles.subheading}>Practical Tips to Build Confidence</h3>
            <ul className={styles.contentList}>
              <li><strong>Set small, realistic goals</strong> – Each step builds belief in your abilities.</li>
              <li><strong>Celebrate progress, not perfection</strong> – Focus on effort and learning.</li>
              <li><strong>Challenge unhelpful thoughts</strong> – Ask: &quot;Is this fact or just fear talking?&quot;</li>
              <li><strong>Practice doing hard things</strong> – Confidence grows through action.</li>
              <li><strong>Keep a &apos;strengths list&apos;</strong> – Remind yourself what you&apos;ve already overcome.</li>
            </ul>

            <h3 className={styles.subheading}>Try This: Confidence &amp; Resilience Journaling Prompts</h3>
            <ul className={styles.promptList}>
              <li>&quot;A time I bounced back from something difficult was…&quot;</li>
              <li>&quot;A strength I used this week was…&quot;</li>
              <li>&quot;One small thing I can do tomorrow to move forward is…&quot;</li>
            </ul>

            <h3 className={styles.subheading}>When to Seek Help</h3>
            <p className={styles.contentBody}>
              If you are finding it difficult to cope with stress, have persistent feelings of sadness or hopelessness, or if your usual coping strategies aren&apos;t helping, it may be time to speak with a mental health professional. Building resilience is a process, and seeking support is an important step in strengthening your ability to cope with life&apos;s challenges.
            </p>

            <h3 className={styles.subheading}>Conclusion</h3>
            <p className={styles.contentBody}>
              Resilience is a skill that can be developed and nurtured over time. With the right tools and strategies, you can learn to manage adversity, recover from setbacks, and ultimately thrive in the face of challenges. As you work on building your resilience, remember that it&apos;s okay to seek help, take time for yourself, and celebrate the progress you make along the way. And please ask me any questions or if you need support.
            </p>

            <h3 className={styles.subheading}>Further Resources</h3>
            <p className={styles.contentBody}>
              <a href="https://www.nhs.uk/every-mind-matters/lifes-challenges/work-related-stress/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>NHS: Stress, anxiety and depression</a>
              <br />
              <a href="https://www.mind.org.uk/workplace/my-mental-health-at-work/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>Mind: Mind&apos;s Guide to Burnout</a>
              <br />
              <a href="https://www.bacp.co.uk" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>The British Association for Counselling and Psychotherapy (BACP): BACP Website</a>
            </p>
          </div>
        </section>

        <section id="mindfulness" className={styles.contentSection}>
          <div className={styles.contentSectionInner}>
            <h2 className={styles.contentTitle}>Mindfulness: A Gentle Introduction</h2>
            <p className={styles.contentIntro}>
              Mindfulness is simply about paying attention to the present moment, without judgement. It sounds simple, but in our busy lives, we spend most of our time lost in thoughts about the past or future. These exercises can help you find a little more calm and clarity. There&apos;s no right or wrong way to do them — just see what works for you.
            </p>

            <h3 className={styles.subheading}>Mindful Breathing</h3>
            <p className={styles.contentBody}>
              Find somewhere comfortable and close your eyes if that feels okay. Breathe naturally and simply notice your breath — the rise and fall of your chest, the air moving in and out. When your mind wanders (and it will — that&apos;s completely normal), gently guide your attention back to your breath. Even two or three minutes can help.
            </p>

            <h3 className={styles.subheading}>The 5-4-3-2-1 Grounding Exercise</h3>
            <p className={styles.contentBody}>
              This is particularly helpful when you&apos;re feeling overwhelmed or anxious. Pause wherever you are and notice: 5 things you can see, 4 things you can touch or feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. It gently brings you back to the present moment and out of your racing thoughts.
            </p>

            <h3 className={styles.subheading}>Leaves on a Stream</h3>
            <p className={styles.contentBody}>
              This visualisation comes from Acceptance and Commitment Therapy and helps create distance from difficult thoughts. Imagine a gentle stream with leaves floating on the surface. As thoughts arise — any thoughts, positive or negative — picture placing each one on a leaf and watching it drift away. You&apos;re not trying to stop your thoughts or change them, just observing them come and go. If you get caught up in a thought, that&apos;s okay — simply notice it happened and return to the stream.
            </p>

            <h3 className={styles.subheading}>Body Scan</h3>
            <p className={styles.contentBody}>
              Lie down or sit comfortably and bring your attention slowly through your body, starting at your toes and moving up to the top of your head. Simply notice what you find — areas of tension, warmth, discomfort, or ease. You don&apos;t need to change anything; just observe with curiosity. This helps you reconnect with your body and often releases tension you didn&apos;t know you were holding.
            </p>

            <h3 className={styles.subheading}>Mindful Walking</h3>
            <p className={styles.contentBody}>
              You can practise mindfulness while walking — no need to sit still. Walk at a comfortable pace and bring your attention to the sensations: your feet on the ground, the movement of your body, the air on your skin, the sounds around you. When your mind drifts to your to-do list or yesterday&apos;s conversation, gently bring it back to the experience of walking.
            </p>

            <h3 className={styles.subheading}>Loving-Kindness</h3>
            <p className={styles.contentBody}>
              Sit quietly and silently repeat phrases of kindness, first to yourself: &quot;May I be happy. May I be healthy. May I be safe.&quot; Then extend these wishes to others — someone you love, someone neutral, even someone difficult. This practice cultivates warmth and compassion, and research shows it genuinely shifts our emotional state over time.
            </p>

            <p className={styles.contentBody}>
              Start small. Even a few minutes of mindfulness practice can make a difference. Be patient with yourself — a wandering mind isn&apos;t failure, it&apos;s just what minds do. The practice is in the gentle returning, again and again.
            </p>

            <p className={styles.contentBody}>
              If you&apos;d like to explore mindfulness further, or if you&apos;re finding that stress, anxiety or difficult thoughts are getting in the way of daily life, I&apos;d be happy to talk. Therapy can provide a space to develop these skills with support and to explore what&apos;s underneath.
            </p>
          </div>
        </section>

        <section id="printable-resources" className={`${styles.contentSection} ${styles.contentSectionLight}`}>
          <div className={styles.contentSectionInner}>
            <h2 className={styles.contentTitle}>Printable Resources</h2>
            <p className={styles.contentIntro}>
              Downloads and worksheets to support your practice. Pick a section below to find what you need.
            </p>

            <h3 className={styles.subheading} id="mindful-colouring">Mindful Colouring</h3>
            <p className={styles.contentBody}>
              Content to be added.
            </p>

            <h3 className={styles.subheading} id="dot-to-dot">Dot to Dot</h3>
            <p className={styles.contentBody}>
              <a href="/resources/Minful-Dot-to-Dots.pdf" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>Mindful Dot to Dots</a> — printable dot-to-dot activities for focused, calming attention.
            </p>

            <h3 className={styles.subheading} id="word-searches">Word Searches</h3>
            <p className={styles.contentBody}>
              <a href="/resources/Therapeutic-Wordsearch-Collection.pdf" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>Therapeutic Wordsearch Collection</a> — a set of therapeutic word searches to support reflection and relaxation.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
