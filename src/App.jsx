import { useState } from 'react'
import logo from './assets/logo.svg'
import photo1 from './assets/photo1.jpg'
import photo2 from './assets/photo2.jpg'
import photo3 from './assets/photo3.jpg'

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg: '#0a0a0a',
  surface: '#111111',
  surface2: '#0f0f0f',
  border: '#222222',
  border2: '#333333',
  text: '#ffffff',
  muted: '#888888',
  accent: '#ffffff',
  error: '#e05c5c',
}

const FONT = "'Campton', sans-serif"

// ─── ICONS ────────────────────────────────────────────────────────────────────
const IconContract = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)
const IconBudget = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
)
const IconPoster = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
)
const IconDrive = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)
const IconChevron = ({ dir = 'right' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: dir === 'left' ? 'rotate(180deg)' : dir === 'up' ? 'rotate(-90deg)' : dir === 'down' ? 'rotate(90deg)' : 'none' }}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)
const IconAI = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/>
    <path d="M12 8v4l2 2"/>
    <path d="M18 2l4 4-4 4"/>
    <path d="M22 6h-6"/>
  </svg>
)

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function Pill({ active, onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '6px 18px',
        border: `1px solid ${active ? T.text : T.border2}`,
        background: active ? T.text : 'transparent',
        color: active ? T.bg : disabled ? T.muted : T.muted,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        transition: 'all 0.15s',
        opacity: disabled ? 0.4 : 1,
        fontFamily: FONT,
      }}
    >
      {children}
    </button>
  )
}

function Input({ label, placeholder, value, onChange, type = 'text', hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && (
        <label style={{
          fontSize: 11, color: T.muted,
          textTransform: 'uppercase', letterSpacing: '0.15em',
          fontFamily: FONT,
        }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${T.border2}`,
          borderRadius: 0,
          padding: '12px 0',
          color: T.text,
          fontSize: 13,
          letterSpacing: '0.05em',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          fontFamily: FONT,
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderBottomColor = T.text}
        onBlur={e => e.target.style.borderBottomColor = T.border2}
      />
      {hint && <span style={{ fontSize: 11, color: T.muted, fontFamily: FONT }}>{hint}</span>}
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && (
        <label style={{
          fontSize: 11, color: T.muted,
          textTransform: 'uppercase', letterSpacing: '0.15em',
          fontFamily: FONT,
        }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${T.border2}`,
          borderRadius: 0,
          padding: '12px 24px 12px 0',
          color: T.text,
          fontSize: 13,
          letterSpacing: '0.05em',
          outline: 'none',
          width: '100%',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 4px center',
          fontFamily: FONT,
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderBottomColor = T.text}
        onBlur={e => e.target.style.borderBottomColor = T.border2}
      >
        {options.map(o => (
          <option key={o.value} value={o.value} style={{ background: '#111111' }}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => onChange(!checked)}>
      <div style={{
        width: 36, height: 20, borderRadius: 10,
        background: checked ? T.text : T.border2,
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 3, left: checked ? 19 : 3,
          width: 14, height: 14, borderRadius: '50%',
          background: checked ? T.bg : T.muted,
          transition: 'left 0.2s',
        }}/>
      </div>
      {label && <span style={{ fontSize: 13, color: T.text, userSelect: 'none', letterSpacing: '0.05em', fontFamily: FONT }}>{label}</span>}
    </div>
  )
}

function Checkbox({ label, checked, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => onChange(!checked)}>
      <div style={{
        width: 16, height: 16,
        border: `1px solid ${checked ? T.text : T.border2}`,
        background: checked ? T.text : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <polyline points="2 6 5 9 10 3" stroke={T.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span style={{ fontSize: 13, color: T.text, userSelect: 'none', letterSpacing: '0.05em', fontFamily: FONT }}>{label}</span>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: 11, color: T.muted,
      textTransform: 'uppercase', letterSpacing: '0.2em',
      fontWeight: 300, marginBottom: 20, marginTop: 4,
      fontFamily: FONT,
    }}>
      {children}
    </div>
  )
}

// ─── BUTTONS ──────────────────────────────────────────────────────────────────
const btnPrimary = {
  background: T.text,
  color: T.bg,
  border: 'none',
  borderRadius: 0,
  padding: '14px 32px',
  fontSize: 12,
  fontWeight: 400,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  fontFamily: FONT,
  transition: 'opacity 0.15s',
}

const btnSecondary = {
  background: 'transparent',
  color: T.muted,
  border: `1px solid ${T.border2}`,
  borderRadius: 0,
  padding: '14px 32px',
  fontSize: 12,
  fontWeight: 400,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  fontFamily: FONT,
  transition: 'all 0.15s',
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 500))
    if (password === 'henosis2025') {
      onLogin()
    } else {
      setError('Par Toutatis, réessayez !')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: T.bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT,
    }}>
      <div style={{ width: '100%', maxWidth: 320, padding: '0 24px', boxSizing: 'border-box' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <img src={logo} style={{ height: 80, display: 'block', margin: '0 auto' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={setPassword}
          />

          {error && (
            <div style={{
              fontSize: 12, color: T.error, letterSpacing: '0.05em',
              borderLeft: `2px solid ${T.error}`, paddingLeft: 12,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...btnPrimary,
              width: '100%',
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Vérification…' : 'Accéder à la toolbox'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── PLACEHOLDER MODULE ───────────────────────────────────────────────────────
function PlaceholderModule({ name }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '60vh', gap: 16, color: T.muted,
    }}>
      <div style={{
        fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
        fontWeight: 300, color: T.muted, fontFamily: FONT,
      }}>
        {name} — Module en cours de développement
      </div>
    </div>
  )
}

// ─── CONTRATS MODULE ──────────────────────────────────────────────────────────
const STEPS = [
  { num: '01', label: 'Langue' },
  { num: '02', label: 'Artiste' },
  { num: '03', label: 'Événement' },
  { num: '04', label: 'Finances' },
  { num: '05', label: 'Accueil' },
  { num: '06', label: 'Préambule' },
  { num: '07', label: 'Aperçu' },
]

const PAYS = [
  'Suisse', 'France', 'Allemagne', 'Italie', 'Espagne', 'Belgique',
  'Luxembourg', 'Autriche', 'Pays-Bas', 'Portugal', 'Mongolie',
]
const LIEUX = [
  { value: 'henosis', label: 'Centre culturel Henosis' },
  { value: 'abbatiale', label: 'Abbatiale de Romainmôtier' },
  { value: 'jardins', label: "Jardins d'Henosis" },
  { value: 'autre', label: 'Autre' },
]
const DUREES = [
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '1 heure' },
  { value: '90', label: '1h30' },
  { value: '120', label: '2 heures' },
]
const HEBERGEMENTS = [
  { value: 'none', label: 'Pas d\'hébergement' },
  { value: 'hotel', label: 'Hôtel (pris en charge)' },
  { value: 'loge', label: 'Loge sur place' },
  { value: 'famille', label: 'Hébergement chez l\'habitant' },
]

function ContratModule() {
  const [tab, setTab] = useState(0)

  // Langue
  const [langue, setLangue] = useState('FR')

  // Artiste
  const [nomGroupe, setNomGroupe] = useState('')
  const [hasRepresentant, setHasRepresentant] = useState(false)
  const [representant, setRepresentant] = useState('')
  const [rue, setRue] = useState('')
  const [codePostal, setCodePostal] = useState('')
  const [ville, setVille] = useState('')
  const [pays, setPays] = useState('Suisse')

  // Événement
  const [datePrestation, setDatePrestation] = useState('')
  const [multiJours, setMultiJours] = useState(false)
  const [dateFin, setDateFin] = useState('')
  const [lieu, setLieu] = useState('henosis')
  const [lieuCustom, setLieuCustom] = useState('')
  const [duree, setDuree] = useState('60')

  // Finances
  const [modeRemun, setModeRemun] = useState('forfait')
  const [devise, setDevise] = useState('CHF')
  const [montantForfait, setMontantForfait] = useState('')
  const [montantMin, setMontantMin] = useState('')
  const [seuilBilleterie, setSeuilBilleterie] = useState('')
  const [pourcentageBilleterie, setPourcentageBilleterie] = useState('')
  const [momentPaiement, setMomentPaiement] = useState('30j')
  const [fraisDeplacement, setFraisDeplacement] = useState(false)
  const [delaiAnnulation, setDelaiAnnulation] = useState('30')

  // Accueil
  const [hebergement, setHebergement] = useState('none')
  const [repasChaud, setRepasChaud] = useState(false)
  const [boissons, setBoissons] = useState(false)

  // Préambule
  const [preambule, setPreambule] = useState('')
  const [loadingIA, setLoadingIA] = useState(false)

  // PDF generation
  const [loadingPDF, setLoadingPDF] = useState(false)
  const [errorPDF, setErrorPDF] = useState('')

  const generatePDF = async () => {
    setLoadingPDF(true)
    setErrorPDF('')

    const [year, month, day] = datePrestation.split('-')
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day))
    const performanceDate = 'le ' + dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })

    const venueMap = {
      henosis: 'au Centre culturel Henosis',
      abbatiale: "dans l'Abbatiale de Romainmôtier",
      jardins: "dans les Jardins d'Henosis",
    }
    const venueName = venueMap[lieu] ?? ('à ' + lieuCustom)

    const paymentMap = {
      avant: 'Le montant sera réglé avant la Prestation',
      apres: 'Le montant sera réglé après la Prestation',
      '30j': 'Le montant sera réglé dans les 30 jours suivant la Prestation',
    }
    const paymentTiming = paymentMap[momentPaiement] ?? momentPaiement

    try {
      const res = await fetch('https://henosis.app.n8n.cloud/webhook/generate-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artistName: nomGroupe,
          artistRepresentative: hasRepresentant ? representant : '',
          artistStreet: rue,
          artistPostalCode: codePostal,
          artistCity: ville,
          artistCountry: pays,
          preambleText: preambule,
          performanceDate,
          venueName,
          duration: duree,
          remunerationType: modeRemun === 'forfait' ? 'fixed' : modeRemun === 'variable' ? 'variable' : 'mixed',
          amount: montantForfait,
          currency: devise,
          guaranteedMinimum: montantMin,
          ticketThreshold: seuilBilleterie,
          ticketPercentage: pourcentageBilleterie,
          paymentTiming,
          warmMeal: repasChaud,
          drinks: boissons,
          cancellationDelay: delaiAnnulation,
        }),
      })

      if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`)

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `contrat-${nomGroupe}-${datePrestation}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setErrorPDF(err.message || 'Erreur lors de la génération du PDF')
    } finally {
      setLoadingPDF(false)
    }
  }

  const defaultPreambule = `L'Association Henosis, ci-après dénommée "l'Organisateur", et ${nomGroupe || '[Nom de l\'artiste]'}, ci-après dénommé "l'Artiste", ont conclu le présent contrat de prestation artistique dans un esprit de collaboration et de respect mutuel.\n\nLes deux parties s'engagent à honorer leurs obligations respectives avec professionnalisme et bonne foi.`

  const simulateIA = async () => {
    setLoadingIA(true)
    await new Promise(r => setTimeout(r, 1800))
    setPreambule(`L'Association Henosis, attachée à la promotion des arts vivants depuis sa fondation, a le plaisir d'accueillir ${nomGroupe || '[Nom de l\'artiste]'} dans le cadre de sa programmation culturelle.\n\nForts d'une vision partagée de l'excellence artistique, l'Organisateur et l'Artiste concluent le présent contrat avec la conviction que cet événement constituera une expérience mémorable pour le public comme pour les artistes.\n\nLes conditions énoncées ci-après reflètent les engagements réciproques des deux parties, établis dans un cadre juridique conforme au droit suisse des obligations.`)
    setLoadingIA(false)
  }

  const lieuLabel = lieu === 'autre' ? (lieuCustom || 'À définir') : (LIEUX.find(l => l.value === lieu)?.label || '')
  const dureeLabel = DUREES.find(d => d.value === duree)?.label || ''

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Stepper */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 0,
        marginBottom: 48, overflowX: 'auto',
      }}>
        {STEPS.map((s, i) => {
          const isActive = tab === i
          const isDone = tab > i
          return (
            <button
              key={s.num}
              onClick={() => setTab(i)}
              style={{
                flex: '0 0 auto',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 8, padding: '0 16px',
                background: 'transparent', border: 'none',
                cursor: 'pointer', fontFamily: FONT,
                borderBottom: `2px solid ${isActive ? T.text : isDone ? T.border2 : T.border}`,
                paddingBottom: 12,
              }}
            >
              <span style={{
                fontSize: 18, fontWeight: 300,
                letterSpacing: '0.05em',
                color: isActive ? T.text : isDone ? T.muted : T.border2,
              }}>
                {s.num}
              </span>
              <span style={{
                fontSize: 10, letterSpacing: '0.15em',
                textTransform: 'uppercase', fontWeight: 300,
                color: isActive ? T.text : isDone ? T.muted : T.border2,
              }}>
                {s.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Step content */}
      <div style={{ minHeight: 360 }}>

        {/* STEP 0 : Langue */}
        {tab === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <SectionTitle>Langue du contrat</SectionTitle>
            <div style={{ display: 'flex', gap: 8 }}>
              {['FR', 'EN', 'DE'].map(l => (
                <Pill key={l} active={langue === l} onClick={() => setLangue(l)}>{l}</Pill>
              ))}
            </div>
            <div style={{
              borderLeft: `2px solid ${T.border2}`,
              paddingLeft: 16, fontSize: 12, color: T.muted, lineHeight: 1.7,
              letterSpacing: '0.03em',
            }}>
              Le choix de la langue détermine la version du template injectée dans le workflow n8n. Un seul workflow génère les trois versions — seule la variable <code style={{ color: T.text }}>lang</code> change à chaque appel.
            </div>
          </div>
        )}

        {/* STEP 1 : Artiste */}
        {tab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionTitle>Informations sur l'artiste</SectionTitle>
            <Input label="Nom du groupe / artiste" placeholder="ex: Les Irréductibles Gaulois" value={nomGroupe} onChange={setNomGroupe} />
            <Toggle label="Représentant légal distinct" checked={hasRepresentant} onChange={setHasRepresentant} />
            {hasRepresentant && (
              <Input label="Représentant légal" placeholder="ex: Hubert Bonisseur de la Bath" value={representant} onChange={setRepresentant} />
            )}
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 24, marginTop: 4 }}>
              <SectionTitle>Adresse</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Input label="Rue et numéro" placeholder="ex: 12 allée des Menhirs" value={rue} onChange={setRue} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                  <Input label="Code postal" placeholder="ex: 1348" value={codePostal} onChange={setCodePostal} />
                  <Input label="Ville" placeholder="ex: Le Pinacle" value={ville} onChange={setVille} />
                </div>
                <Select label="Pays" value={pays} onChange={setPays} options={PAYS.map(p => ({ value: p, label: p }))} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 : Événement */}
        {tab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionTitle>Détails de la prestation</SectionTitle>
            <Input label="Date de prestation" type="date" value={datePrestation} onChange={setDatePrestation} />
            <Toggle label="Prestation sur plusieurs jours" checked={multiJours} onChange={setMultiJours} />
            {multiJours && (
              <Input label="Date de fin" type="date" value={dateFin} onChange={setDateFin} />
            )}
            <Select label="Lieu" value={lieu} onChange={setLieu} options={LIEUX} />
            {lieu === 'autre' && (
              <Input label="Précisez le lieu" placeholder="ex: Salle des Fêtes de Lutèce" value={lieuCustom} onChange={setLieuCustom} />
            )}
            <Select label="Durée de la prestation" value={duree} onChange={setDuree} options={DUREES} />
          </div>
        )}

        {/* STEP 3 : Finances */}
        {tab === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionTitle>Mode de rémunération</SectionTitle>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Pill active={modeRemun === 'forfait'} onClick={() => setModeRemun('forfait')}>Forfait fixe</Pill>
              <Pill active={modeRemun === 'variable'} onClick={() => setModeRemun('variable')}>Variable</Pill>
              <Pill active={modeRemun === 'mixte'} onClick={() => setModeRemun('mixte')}>Mixte</Pill>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
              <Select label="Devise" value={devise} onChange={setDevise} options={[
                { value: 'CHF', label: 'CHF' },
                { value: 'EUR', label: 'EUR' },
                { value: 'USD', label: 'USD' },
              ]} />
              {(modeRemun === 'forfait' || modeRemun === 'mixte') && (
                <Input
                  label={modeRemun === 'mixte' ? 'Montant minimal garanti' : 'Montant forfaitaire'}
                  placeholder="ex: 1500"
                  value={montantForfait}
                  onChange={setMontantForfait}
                />
              )}
            </div>

            {(modeRemun === 'variable' || modeRemun === 'mixte') && (
              <div style={{ borderLeft: `2px solid ${T.border2}`, paddingLeft: 20 }}>
                <div style={{ fontSize: 11, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 20 }}>
                  Part variable — billetterie
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {modeRemun === 'variable' && (
                    <Input label={`Montant de base (${devise})`} placeholder="ex: 500" value={montantMin} onChange={setMontantMin} />
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Input label={`Seuil déclenchement (${devise})`} placeholder="ex: 2000" value={seuilBilleterie} onChange={setSeuilBilleterie} />
                    <Input label="Pourcentage (%)" placeholder="ex: 15" value={pourcentageBilleterie} onChange={setPourcentageBilleterie} />
                  </div>
                </div>
              </div>
            )}

            {/* Résumé dynamique */}
            <div style={{
              borderLeft: `2px solid ${T.text}`,
              paddingLeft: 16, fontSize: 13, color: T.muted, lineHeight: 1.8,
              letterSpacing: '0.03em',
            }}>
              {modeRemun === 'forfait' && (
                <span>Forfait fixe de <strong style={{ color: T.text }}>{montantForfait || '—'} {devise}</strong></span>
              )}
              {modeRemun === 'variable' && (
                <span>Base de <strong style={{ color: T.text }}>{montantMin || '—'} {devise}</strong> + <strong style={{ color: T.text }}>{pourcentageBilleterie || '—'}%</strong> des recettes au-delà de <strong style={{ color: T.text }}>{seuilBilleterie || '—'} {devise}</strong></span>
              )}
              {modeRemun === 'mixte' && (
                <span>Minimum garanti <strong style={{ color: T.text }}>{montantForfait || '—'} {devise}</strong> + <strong style={{ color: T.text }}>{pourcentageBilleterie || '—'}%</strong> au-delà de <strong style={{ color: T.text }}>{seuilBilleterie || '—'} {devise}</strong></span>
              )}
            </div>

            <Select label="Moment du paiement" value={momentPaiement} onChange={setMomentPaiement} options={[
              { value: '7j', label: '7 jours après la prestation' },
              { value: '30j', label: '30 jours après la prestation' },
              { value: 'avant', label: 'Avant la prestation (acompte 50%)' },
              { value: 'jour', label: 'Le jour même' },
            ]} />

            <Toggle label="Frais de déplacement pris en charge" checked={fraisDeplacement} onChange={setFraisDeplacement} />

            <Select label="Délai d'annulation (jours)" value={delaiAnnulation} onChange={setDelaiAnnulation} options={[
              { value: '7', label: '7 jours' },
              { value: '14', label: '14 jours' },
              { value: '30', label: '30 jours' },
              { value: '60', label: '60 jours' },
            ]} />
          </div>
        )}

        {/* STEP 4 : Accueil */}
        {tab === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionTitle>Conditions d'accueil</SectionTitle>
            <Select label="Hébergement" value={hebergement} onChange={setHebergement} options={HEBERGEMENTS} />
            <Checkbox label="Repas chaud fourni" checked={repasChaud} onChange={setRepasChaud} />
            <Checkbox label="Boissons fournies (avec modération, par Toutatis)" checked={boissons} onChange={setBoissons} />
          </div>
        )}

        {/* STEP 5 : Préambule */}
        {tab === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SectionTitle>Préambule du contrat</SectionTitle>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setPreambule(defaultPreambule)}
                style={{ ...btnSecondary, padding: '10px 20px' }}
              >
                Texte par défaut
              </button>
              <button
                onClick={simulateIA}
                disabled={loadingIA}
                style={{
                  ...btnSecondary,
                  padding: '10px 20px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  opacity: loadingIA ? 0.5 : 1,
                  cursor: loadingIA ? 'wait' : 'pointer',
                }}
              >
                <IconAI /> {loadingIA ? 'Génération en cours…' : 'Générer avec IA'}
              </button>
            </div>
            {loadingIA && (
              <div style={{ fontSize: 11, color: T.muted, letterSpacing: '0.05em' }}>Appel au workflow n8n en cours…</div>
            )}
            <textarea
              value={preambule}
              onChange={e => setPreambule(e.target.value)}
              rows={10}
              placeholder="Le préambule apparaîtra ici…"
              style={{
                background: T.surface2,
                border: 'none',
                borderBottom: `1px solid ${T.border2}`,
                borderRadius: 0,
                padding: '12px 0',
                color: T.text, fontSize: 13, lineHeight: 1.8,
                letterSpacing: '0.03em',
                resize: 'vertical', fontFamily: FONT, outline: 'none',
                width: '100%', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderBottomColor = T.text}
              onBlur={e => e.target.style.borderBottomColor = T.border2}
            />
          </div>
        )}

        {/* STEP 6 : Aperçu */}
        {tab === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <SectionTitle>Aperçu du contrat</SectionTitle>
              <span style={{
                fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: T.muted, border: `1px solid ${T.border2}`, padding: '4px 10px',
                fontFamily: FONT,
              }}>
                {langue}
              </span>
            </div>

            <div style={{
              border: `1px solid ${T.border}`,
              overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{
                borderBottom: `1px solid ${T.border}`,
                padding: '20px 24px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 10, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 300 }}>Association Henosis</div>
                <div style={{ fontSize: 15, fontWeight: 300, color: T.text, marginTop: 6, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Contrat de prestation artistique</div>
              </div>

              <div style={{ padding: '24px' }}>
                <ContractSection title="1. PARTIES">
                  <ContractRow label="Organisateur" value="Association Henosis, tools.henosis.ch" />
                  <ContractRow label="Artiste" value={nomGroupe || '—'} />
                  {hasRepresentant && representant && <ContractRow label="Représentant" value={representant} />}
                  <ContractRow label="Adresse" value={[rue, `${codePostal} ${ville}`.trim(), pays].filter(Boolean).join(', ') || '—'} />
                </ContractSection>

                {preambule && (
                  <ContractSection title="2. PRÉAMBULE">
                    <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.8, margin: 0, letterSpacing: '0.03em' }}>{preambule}</p>
                  </ContractSection>
                )}

                <ContractSection title="3. PRESTATION">
                  <ContractRow label="Date" value={datePrestation ? new Date(datePrestation).toLocaleDateString('fr-CH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '—'} />
                  {multiJours && dateFin && <ContractRow label="Date de fin" value={new Date(dateFin).toLocaleDateString('fr-CH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />}
                  <ContractRow label="Lieu" value={lieuLabel} />
                  <ContractRow label="Durée" value={dureeLabel} />
                </ContractSection>

                <ContractSection title="4. RÉMUNÉRATION">
                  <ContractRow label="Mode" value={{ forfait: 'Forfait fixe', variable: 'Variable', mixte: 'Mixte' }[modeRemun]} />
                  {(modeRemun === 'forfait' || modeRemun === 'mixte') && montantForfait && (
                    <ContractRow label={modeRemun === 'mixte' ? 'Minimum garanti' : 'Montant'} value={`${montantForfait} ${devise}`} />
                  )}
                  {(modeRemun === 'variable' || modeRemun === 'mixte') && pourcentageBilleterie && (
                    <ContractRow label="Part variable" value={`${pourcentageBilleterie}% au-delà de ${seuilBilleterie || '—'} ${devise}`} />
                  )}
                  <ContractRow label="Paiement" value={{ '7j': '7 jours après', '30j': '30 jours après', avant: 'Acompte 50% avant', jour: 'Le jour même' }[momentPaiement]} />
                  <ContractRow label="Frais déplacement" value={fraisDeplacement ? 'Pris en charge' : 'Non inclus'} />
                  <ContractRow label="Délai annulation" value={`${delaiAnnulation} jours`} />
                </ContractSection>

                <ContractSection title="5. ACCUEIL">
                  <ContractRow label="Hébergement" value={HEBERGEMENTS.find(h => h.value === hebergement)?.label || '—'} />
                  <ContractRow label="Repas" value={repasChaud ? 'Repas chaud fourni' : 'Non inclus'} />
                  <ContractRow label="Boissons" value={boissons ? 'Incluses' : 'Non incluses'} />
                </ContractSection>

                <div style={{
                  marginTop: 20, padding: '10px 14px',
                  border: `1px dashed ${T.border}`,
                  fontSize: 11, color: T.muted, textAlign: 'center',
                  letterSpacing: '0.05em',
                }}>
                  Art. 5–12 inclus dans le PDF final (conditions générales, litiges, signatures…)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {errorPDF && (
        <div style={{
          margin: '24px 0 0',
          borderLeft: `2px solid ${T.error}`,
          paddingLeft: 12, fontSize: 12, color: T.error, letterSpacing: '0.03em',
        }}>
          {errorPDF}
        </div>
      )}

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 32, borderTop: `1px solid ${T.border}`, marginTop: 40,
      }}>
        <button
          onClick={() => setTab(t => Math.max(0, t - 1))}
          disabled={tab === 0}
          style={{
            ...btnSecondary,
            display: 'flex', alignItems: 'center', gap: 8,
            opacity: tab === 0 ? 0.3 : 1,
            cursor: tab === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <IconChevron dir="left" /> Précédent
        </button>

        {tab < STEPS.length - 1 ? (
          <button
            onClick={() => setTab(t => Math.min(STEPS.length - 1, t + 1))}
            style={{ ...btnPrimary, display: 'flex', alignItems: 'center', gap: 8 }}
          >
            Suivant <IconChevron />
          </button>
        ) : (
          <button
            onClick={generatePDF}
            disabled={loadingPDF}
            style={{
              ...btnPrimary,
              width: '100%',
              marginLeft: 'auto',
              maxWidth: 280,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: loadingPDF ? 0.5 : 1,
              cursor: loadingPDF ? 'not-allowed' : 'pointer',
            }}
          >
            {loadingPDF ? 'Génération en cours…' : 'Générer le PDF ↓'}
          </button>
        )}
      </div>
    </div>
  )
}

function ContractSection({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontSize: 10, fontWeight: 400, color: T.muted, letterSpacing: '0.2em',
        textTransform: 'uppercase', marginBottom: 12, paddingBottom: 8,
        borderBottom: `1px solid ${T.border}`, fontFamily: FONT,
      }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {children}
      </div>
    </div>
  )
}

function ContractRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 12, fontSize: 13 }}>
      <span style={{ color: T.muted, flexShrink: 0, width: 140, letterSpacing: '0.03em' }}>{label}</span>
      <span style={{ color: T.text, letterSpacing: '0.03em' }}>{value}</span>
    </div>
  )
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
const MODULES = [
  { id: 'contrats', label: 'Contrats', icon: <IconContract />, active: true },
  { id: 'budget', label: 'Budget', icon: <IconBudget />, soon: true },
  { id: 'affiches', label: 'Affiches', icon: <IconPoster />, soon: true },
  { id: 'kdrive', label: 'kDrive', icon: <IconDrive />, soon: true },
]

function Topbar({ activeModule, onModuleChange, onLogout }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 56,
      background: T.bg,
      borderBottom: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'center',
      padding: '0 32px',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
        <img src={logo} style={{ height: 32 }} />
      </div>

      {/* Nav centered */}
      <nav style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 0,
      }}>
        {MODULES.map((m, i) => {
          const isActive = activeModule === m.id
          return (
            <span key={m.id} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <span style={{ color: T.border2, fontSize: 12, margin: '0 8px', userSelect: 'none' }}>|</span>
              )}
              <button
                onClick={() => !m.soon && onModuleChange(m.id)}
                style={{
                  background: 'transparent', border: 'none',
                  color: isActive ? T.text : m.soon ? T.border2 : T.muted,
                  fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                  fontWeight: 600, cursor: m.soon ? 'not-allowed' : 'pointer',
                  fontFamily: FONT, padding: '4px 0',
                  borderBottom: isActive ? `1px solid ${T.text}` : '1px solid transparent',
                  transition: 'color 0.15s',
                }}
              >
                {m.label}
              </button>
            </span>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ flex: '0 0 auto' }}>
        <button
          onClick={onLogout}
          title="Déconnexion"
          style={{
            background: 'transparent', border: 'none',
            color: T.muted, cursor: 'pointer', padding: 4,
            display: 'flex', alignItems: 'center',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = T.text}
          onMouseLeave={e => e.currentTarget.style.color = T.muted}
        >
          <IconLogout />
        </button>
      </div>
    </div>
  )
}

// ─── PHOTO MOSAIC ────────────────────────────────────────────────────────────
const mosaicKeyframes = `
@keyframes scrollDown {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
`

const colA = [photo1, photo2, photo3, photo1, photo2, photo3]
const colB = [photo2, photo3, photo1, photo2, photo3, photo1]

function PhotoMosaic() {
  return (
    <>
      <style>{mosaicKeyframes}</style>
      <div style={{
        position: 'fixed', top: 0, right: 0,
        width: '20vw', height: '100vh',
        overflow: 'hidden', zIndex: 0,
      }}>
        <div style={{ display: 'flex', height: '100%' }}>
          {/* Colonne A */}
          <div style={{ width: '50%', overflow: 'hidden' }}>
            <div style={{
              display: 'flex', flexDirection: 'column',
              animation: 'scrollDown 30s linear infinite',
            }}>
              {colA.map((src, i) => (
                <img key={i} src={src} style={{
                  width: '100%',
                  height: '33.333vh',
                  objectFit: 'cover',
                  display: 'block',
                  flexShrink: 0,
                }} />
              ))}
            </div>
          </div>
          {/* Colonne B — décalée pour l'effet mosaïque */}
          <div style={{ width: '50%', overflow: 'hidden' }}>
            <div style={{
              display: 'flex', flexDirection: 'column',
              animation: 'scrollDown 22s linear infinite',
              marginTop: '-16.666vh',
            }}>
              {colB.map((src, i) => (
                <img key={i} src={src} style={{
                  width: '100%',
                  height: '33.333vh',
                  objectFit: 'cover',
                  display: 'block',
                  flexShrink: 0,
                }} />
              ))}
            </div>
          </div>
        </div>
        {/* Dégradé gauche pour fondu vers le contenu */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to right, ${T.bg} 0%, transparent 30%)`,
          pointerEvents: 'none',
        }} />
      </div>
    </>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [activeModule, setActiveModule] = useState('contrats')

  return (
    <div style={{
      minHeight: '100vh', background: T.bg,
      fontFamily: FONT, color: T.text,
    }}>
      <Topbar
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        onLogout={onLogout}
      />

      <PhotoMosaic />

      {/* Content — 80% de largeur, laisse 20% à droite pour la mosaïque */}
      <div style={{
        width: '80%',
        maxWidth: 900,
        padding: '88px 32px 64px',
        boxSizing: 'border-box',
        position: 'relative', zIndex: 1,
      }}>
        {activeModule === 'contrats' && <ContratModule />}
        {activeModule === 'budget' && <PlaceholderModule name="Budget" />}
        {activeModule === 'affiches' && <PlaceholderModule name="Affiches" />}
        {activeModule === 'kdrive' && <PlaceholderModule name="kDrive" />}
      </div>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return loggedIn
    ? <Dashboard onLogout={() => setLoggedIn(false)} />
    : <LoginPage onLogin={() => setLoggedIn(true)} />
}
