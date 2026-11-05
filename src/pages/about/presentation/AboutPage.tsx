import { Link } from 'react-router-dom';
import { Icon } from '@/shared/components/ui/Icon';
import { CtaBand, Photo, Scene } from '@/shared/components/ui/Illustrations';

const FIVE_QUESTIONS: Array<[title: string, desc: string]> = [
  [
    'What will you need to know?',
    'The ideas and tools that matter for the job, in plain language.',
  ],
  ['What will you be able to do?', 'The specific tasks you can handle on your own by the end.'],
  ['Which real problem will you solve?', 'A situation a real business actually faces.'],
  ['What proves it?', 'A project you can demonstrate, not just a test score.'],
  ['Where does it lead?', 'A job title, a service you can offer and what to learn next.'],
];

export default function AboutPage() {
  return (
    <>
      <section className="phead">
        <div className="wrap about-split">
          <div>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <Icon name="chevron-down" />
              <span>About</span>
            </div>
            <h1 style={{ maxWidth: '14ch' }}>Skills that travel anywhere.</h1>
            <p className="lede">
              TFN Academy is the training arm of TFN Solutions. We prepare young Nigerians for work
              that does not depend on where they live: remote roles, global freelance work and
              companies they start themselves.
            </p>
          </div>
          <Photo slot="about" idx={8} className="arch" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <h2>How we teach</h2>
            <p>Three principles shape every programme.</p>
          </div>
          <div className="pillars">
            <div className="pillar">
              <h3>Learn by building</h3>
              <p>
                Each programme is project-led, so you finish with proof of what you can do, not
                just a certificate.
              </p>
            </div>
            <div className="pillar">
              <h3>Built for the world market</h3>
              <p>Our curriculum follows international job markets and certification standards.</p>
            </div>
            <div className="pillar">
              <h3>Ready for work</h3>
              <p>
                Soft skills like communication, teamwork and client handling are taught alongside
                technical skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec on-night">
        <div className="wrap">
          <div className="head">
            <h2>Five questions behind every programme</h2>
            <p>
              Before a programme goes live, it has to answer these clearly. You’ll find the answers
              on each programme page.
            </p>
          </div>
          <div className="five">
            {FIVE_QUESTIONS.map(([h, p], i) => (
              <div key={h}>
                <span className="n">{i + 1}</span>
                <b>{h}</b>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div
          className="wrap split"
          style={{ gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)' }}
        >
          <div>
            <h2 style={{ marginBottom: 18 }}>A subsidiary of TFN Solutions</h2>
            <p className="lede">
              TFN Academy is backed by TFN Solutions, so our training stays close to the technology
              and business skills real organisations use. We are based in Awka, Anambra State, with
              online learning coming soon.
            </p>
            <p style={{ marginTop: 28 }}>
              <Link className="btn btn-brand" to="/programmes">
                Explore programmes <Icon name="arrow-right" className="arr" />
              </Link>
            </p>
          </div>
          <Photo slot="about2" idx={3} className="rsq" />
        </div>
      </section>

      <section className="sec on-mist">
        <div className="wrap split">
          <Scene slot="about-hub" v={1} className="rsq" />
          <div>
            <h2 style={{ marginBottom: 18 }}>TFN Hub: a space to work without interruption</h2>
            <p className="lede">
              Beyond training, we run a co-working hub in Awka with reliable power and fast
              internet, open to techies, freelancers, founders and teams. Book a desk, a training
              room or a private meeting room.
            </p>
            <p style={{ marginTop: 28 }}>
              <Link className="btn btn-brand" to="/hub">
                Explore the Hub <Icon name="arrow-right" className="arr" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="sec-sm">
        <div className="wrap">
          <CtaBand />
        </div>
      </section>
    </>
  );
}
