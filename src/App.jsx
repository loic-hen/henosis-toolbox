import { useState } from 'react'
import logo from './assets/logo.svg'

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg: '#0d0d0d',
  surface: '#161616',
  surface2: '#1e1e1e',
  border: '#2a2a2a',
  text: '#ffffff',
  muted: '#b0ada6',
  dim: '#7a7770',
  accent: '#c8a97e',
  accentDim: 'rgba(200,169,126,0.12)',
  accentDimHover: 'rgba(200,169,126,0.2)',
  error: '#e05c5c',
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const IconContract = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)
const IconBudget = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
)
const IconPoster = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
)
const IconDrive = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
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
const IconMenu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
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
        padding: '6px 16px',
        borderRadius: 20,
        border: `1px solid ${active ? T.accent : T.border}`,
        background: active ? T.accentDim : 'transparent',
        color: active ? T.accent : disabled ? T.muted : T.text,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        transition: 'all 0.15s',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  )
}

function Input({ label, placeholder, value, onChange, type = 'text', hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 12, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: T.surface2,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          padding: '9px 12px',
          color: T.text,
          fontSize: 14,
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = T.accent}
        onBlur={e => e.target.style.borderColor = T.border}
      />
      {hint && <span style={{ fontSize: 11, color: T.muted }}>{hint}</span>}
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 12, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          background: T.surface2,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          padding: '9px 12px',
          color: T.text,
          fontSize: 14,
          outline: 'none',
          width: '100%',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a8880' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: 36,
        }}
        onFocus={e => e.target.style.borderColor = T.accent}
        onBlur={e => e.target.style.borderColor = T.border}
      >
        {options.map(o => (
          <option key={o.value} value={o.value} style={{ background: T.surface }}>
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
        width: 40, height: 22, borderRadius: 11,
        background: checked ? T.accent : T.border,
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 3, left: checked ? 21 : 3,
          width: 16, height: 16, borderRadius: '50%',
          background: checked ? T.surface : T.muted,
          transition: 'left 0.2s',
        }}/>
      </div>
      {label && <span style={{ fontSize: 14, color: T.text, userSelect: 'none' }}>{label}</span>}
    </div>
  )
}

function Checkbox({ label, checked, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => onChange(!checked)}>
      <div style={{
        width: 18, height: 18, borderRadius: 4,
        border: `1.5px solid ${checked ? T.accent : T.border}`,
        background: checked ? T.accentDim : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <polyline points="2 6 5 9 10 3" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span style={{ fontSize: 14, color: T.text, userSelect: 'none' }}>{label}</span>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <div style={{ fontSize: 11, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16, marginTop: 4 }}>
      {children}
    </div>
  )
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
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 16, padding: '48px 40px', width: 360,
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img src={logo} style={{
            width: 72, height: 72, borderRadius: 14,
            display: 'block', margin: '0 auto 16px',
          }} />
          <div style={{ fontSize: 20, fontWeight: 700, color: T.accent, letterSpacing: '0.12em' }}>HENOSIS</div>
          <div style={{ fontSize: 11, color: T.muted, letterSpacing: '0.22em', marginTop: 2 }}>TOOLBOX</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={setPassword}
          />

          {error && (
            <div style={{
              background: 'rgba(224,92,92,0.1)', border: '1px solid rgba(224,92,92,0.3)',
              borderRadius: 8, padding: '10px 14px',
              color: T.error, fontSize: 13, textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              padding: '11px 0',
              borderRadius: 8,
              border: 'none',
              background: loading ? T.border : T.accent,
              color: loading ? T.muted : '#0d0d0d',
              fontWeight: 700, fontSize: 14,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.04em',
              transition: 'all 0.15s',
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
      height: '100%', gap: 16, color: T.muted,
    }}>
      <div style={{ fontSize: 56 }}>🚧</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: T.text }}>{name}</div>
      <div style={{ fontSize: 14 }}>Module en cours de développement</div>
    </div>
  )
}

// ─── CONTRATS MODULE ──────────────────────────────────────────────────────────
const TABS = ['Langue', 'Artiste', 'Événement', 'Finances', 'Accueil', 'Préambule', 'Aperçu']

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

  const progressPct = Math.round(((tab + 1) / TABS.length) * 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Progress bar */}
      <div style={{ padding: '0 0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: T.muted }}>Progression</span>
          <span style={{ fontSize: 12, color: T.accent }}>{progressPct}%</span>
        </div>
        <div style={{ height: 4, background: T.border, borderRadius: 2 }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: `linear-gradient(90deg, ${T.accent}, #e8c898)`,
            width: `${progressPct}%`, transition: 'width 0.3s',
          }}/>
        </div>
      </div>

      {/* Tab pills */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
              border: `1px solid ${tab === i ? T.accent : T.border}`,
              background: tab === i ? T.accentDim : 'transparent',
              color: tab === i ? T.accent : T.muted,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>

        {/* TAB 0 : Langue */}
        {tab === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionTitle>Langue du contrat</SectionTitle>
            <div style={{ display: 'flex', gap: 10 }}>
              {['FR', 'EN', 'DE'].map(l => (
                <Pill key={l} active={langue === l} onClick={() => setLangue(l)}>{l}</Pill>
              ))}
            </div>
            <div style={{
              background: T.accentDim, border: `1px solid ${T.accent}`,
              borderRadius: 10, padding: '14px 16px', fontSize: 13, color: T.accent, lineHeight: 1.7,
            }}>
              <strong>Note :</strong> Le choix de la langue ici détermine la version du template injectée dans le workflow n8n. Un seul workflow génère les trois versions — seule la variable <code style={{ background: 'rgba(200,169,126,0.15)', padding: '1px 5px', borderRadius: 4 }}>lang</code> change à chaque appel.
            </div>
          </div>
        )}

        {/* TAB 1 : Artiste */}
        {tab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SectionTitle>Informations sur l'artiste</SectionTitle>
            <Input label="Nom du groupe / artiste" placeholder="ex: Les Irréductibles Gaulois" value={nomGroupe} onChange={setNomGroupe} />
            <Toggle label="Représentant légal distinct" checked={hasRepresentant} onChange={setHasRepresentant} />
            {hasRepresentant && (
              <Input label="Représentant légal" placeholder="ex: Hubert Bonisseur de la Bath" value={representant} onChange={setRepresentant} />
            )}
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 20 }}>
              <SectionTitle>Adresse</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Input label="Rue et numéro" placeholder="ex: 12 allée des Menhirs, à côté du poissonnier" value={rue} onChange={setRue} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                  <Input label="Code postal" placeholder="ex: 1348" value={codePostal} onChange={setCodePostal} />
                  <Input label="Ville" placeholder="ex: Le Pinacle" value={ville} onChange={setVille} />
                </div>
                <Select
                  label="Pays"
                  value={pays}
                  onChange={setPays}
                  options={PAYS.map(p => ({ value: p, label: p }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 : Événement */}
        {tab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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

        {/* TAB 3 : Finances */}
        {tab === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SectionTitle>Mode de rémunération</SectionTitle>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Pill active={modeRemun === 'forfait'} onClick={() => setModeRemun('forfait')}>Forfait fixe</Pill>
              <Pill active={modeRemun === 'variable'} onClick={() => setModeRemun('variable')}>Variable</Pill>
              <Pill active={modeRemun === 'mixte'} onClick={() => setModeRemun('mixte')}>Mixte</Pill>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
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
              <div style={{ background: T.surface2, borderRadius: 10, padding: 16, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 12, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
                  Part variable — billetterie
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {modeRemun === 'variable' && (
                    <Input label={`Montant de base (${devise})`} placeholder="ex: 500" value={montantMin} onChange={setMontantMin} />
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Input label={`Seuil déclenchement (${devise})`} placeholder="ex: 2000" value={seuilBilleterie} onChange={setSeuilBilleterie} />
                    <Input label="Pourcentage (%)" placeholder="ex: 15" value={pourcentageBilleterie} onChange={setPourcentageBilleterie} />
                  </div>
                </div>
              </div>
            )}

            {/* Résumé dynamique */}
            <div style={{
              background: T.accentDim, border: `1px solid rgba(200,169,126,0.3)`,
              borderRadius: 10, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Résumé</div>
              <div style={{ fontSize: 14, color: T.accent, lineHeight: 1.8 }}>
                {modeRemun === 'forfait' && (
                  <span>Forfait fixe de <strong>{montantForfait || '—'} {devise}</strong></span>
                )}
                {modeRemun === 'variable' && (
                  <span>Base de <strong>{montantMin || '—'} {devise}</strong> + <strong>{pourcentageBilleterie || '—'}%</strong> des recettes au-delà de <strong>{seuilBilleterie || '—'} {devise}</strong></span>
                )}
                {modeRemun === 'mixte' && (
                  <span>Minimum garanti <strong>{montantForfait || '—'} {devise}</strong> + <strong>{pourcentageBilleterie || '—'}%</strong> au-delà de <strong>{seuilBilleterie || '—'} {devise}</strong></span>
                )}
              </div>
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

        {/* TAB 4 : Accueil */}
        {tab === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SectionTitle>Conditions d'accueil</SectionTitle>
            <Select label="Hébergement" value={hebergement} onChange={setHebergement} options={HEBERGEMENTS} />
            <Checkbox label="Repas chaud fourni" checked={repasChaud} onChange={setRepasChaud} />
            <Checkbox label="Boissons fournies (avec modération, par Toutatis)" checked={boissons} onChange={setBoissons} />
          </div>
        )}

        {/* TAB 5 : Préambule */}
        {tab === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SectionTitle>Préambule du contrat</SectionTitle>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setPreambule(defaultPreambule)}
                style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                  border: `1px solid ${T.border}`, background: 'transparent',
                  color: T.text, cursor: 'pointer',
                }}
              >
                Texte par défaut
              </button>
              <button
                onClick={simulateIA}
                disabled={loadingIA}
                style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                  border: `1px solid ${T.accent}`, background: T.accentDim,
                  color: T.accent, cursor: loadingIA ? 'wait' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  opacity: loadingIA ? 0.7 : 1,
                }}
              >
                <IconAI /> {loadingIA ? 'Génération en cours…' : 'Générer avec IA'}
              </button>
            </div>
            {loadingIA && (
              <div style={{ fontSize: 12, color: T.muted }}>Appel au workflow n8n en cours…</div>
            )}
            <textarea
              value={preambule}
              onChange={e => setPreambule(e.target.value)}
              rows={10}
              placeholder="Le préambule apparaîtra ici. Cliquez sur 'Texte par défaut' ou 'Générer avec IA'."
              style={{
                background: T.surface2, border: `1px solid ${T.border}`,
                borderRadius: 8, padding: '12px 14px',
                color: T.text, fontSize: 14, lineHeight: 1.7,
                resize: 'vertical', fontFamily: 'inherit', outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = T.accent}
              onBlur={e => e.target.style.borderColor = T.border}
            />
          </div>
        )}

        {/* TAB 6 : Aperçu */}
        {tab === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <SectionTitle>Aperçu du contrat</SectionTitle>
              <div style={{
                padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: T.accentDim, border: `1px solid ${T.accent}`,
                color: T.accent, letterSpacing: '0.1em',
              }}>
                {langue}
              </div>
            </div>

            {/* Contract preview */}
            <div style={{
              background: T.surface2, border: `1px solid ${T.border}`,
              borderRadius: 12, overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{
                background: T.accentDim, borderBottom: `1px solid ${T.border}`,
                padding: '20px 24px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 13, color: T.muted, letterSpacing: '0.1em' }}>ASSOCIATION HENOSIS</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: T.accent, marginTop: 4 }}>CONTRAT DE PRESTATION ARTISTIQUE</div>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Parties */}
                <ContractSection title="1. PARTIES">
                  <ContractRow label="Organisateur" value="Association Henosis, tools.henosis.ch" />
                  <ContractRow label="Artiste" value={nomGroupe || '—'} />
                  {hasRepresentant && representant && <ContractRow label="Représentant" value={representant} />}
                  <ContractRow label="Adresse" value={[rue, `${codePostal} ${ville}`.trim(), pays].filter(Boolean).join(', ') || '—'} />
                </ContractSection>

                {/* Préambule */}
                {preambule && (
                  <ContractSection title="2. PRÉAMBULE">
                    <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.8, margin: 0 }}>{preambule}</p>
                  </ContractSection>
                )}

                {/* Prestation */}
                <ContractSection title="3. PRESTATION">
                  <ContractRow label="Date" value={datePrestation ? new Date(datePrestation).toLocaleDateString('fr-CH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '—'} />
                  {multiJours && dateFin && <ContractRow label="Date de fin" value={new Date(dateFin).toLocaleDateString('fr-CH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />}
                  <ContractRow label="Lieu" value={lieuLabel} />
                  <ContractRow label="Durée" value={dureeLabel} />
                </ContractSection>

                {/* Rémunération */}
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

                {/* Accueil */}
                <ContractSection title="5. ACCUEIL">
                  <ContractRow label="Hébergement" value={HEBERGEMENTS.find(h => h.value === hebergement)?.label || '—'} />
                  <ContractRow label="Repas" value={repasChaud ? 'Repas chaud fourni' : 'Non inclus'} />
                  <ContractRow label="Boissons" value={boissons ? 'Incluses' : 'Non incluses'} />
                </ContractSection>

                <div style={{
                  marginTop: 20, padding: '10px 14px', borderRadius: 8,
                  background: 'rgba(200,169,126,0.06)', border: `1px dashed ${T.border}`,
                  fontSize: 12, color: T.muted, textAlign: 'center',
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
          margin: '16px 0 0',
          background: 'rgba(224,92,92,0.1)', border: '1px solid rgba(224,92,92,0.3)',
          borderRadius: 8, padding: '10px 14px',
          color: T.error, fontSize: 13,
        }}>
          {errorPDF}
        </div>
      )}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 20, borderTop: `1px solid ${T.border}`, marginTop: 20,
      }}>
        <button
          onClick={() => setTab(t => Math.max(0, t - 1))}
          disabled={tab === 0}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 18px', borderRadius: 8, fontSize: 13,
            border: `1px solid ${T.border}`, background: 'transparent',
            color: tab === 0 ? T.muted : T.text, cursor: tab === 0 ? 'not-allowed' : 'pointer',
            opacity: tab === 0 ? 0.4 : 1,
          }}
        >
          <IconChevron dir="left" /> Précédent
        </button>

        {tab < TABS.length - 1 ? (
          <button
            onClick={() => setTab(t => Math.min(TABS.length - 1, t + 1))}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 18px', borderRadius: 8, fontSize: 13,
              border: `1px solid ${T.accent}`, background: T.accentDim,
              color: T.accent, cursor: 'pointer',
            }}
          >
            Suivant <IconChevron />
          </button>
        ) : (
          <button
            onClick={generatePDF}
            disabled={loadingPDF}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700,
              border: 'none', background: loadingPDF ? T.border : T.accent,
              color: loadingPDF ? T.muted : '#0d0d0d',
              cursor: loadingPDF ? 'not-allowed' : 'pointer',
              letterSpacing: '0.03em',
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
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 10, paddingBottom: 6,
        borderBottom: `1px solid ${T.border}`,
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
      <span style={{ color: T.muted, flexShrink: 0, width: 140 }}>{label}</span>
      <span style={{ color: T.text }}>{value}</span>
    </div>
  )
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const MODULES = [
  { id: 'contrats', label: 'Contrats', icon: <IconContract />, active: true },
  { id: 'budget', label: 'Budget', icon: <IconBudget />, soon: true },
  { id: 'affiches', label: 'Affiches', icon: <IconPoster />, soon: true },
  { id: 'kdrive', label: 'kDrive', icon: <IconDrive />, soon: true },
]

function Sidebar({ collapsed, onToggle, activeModule, onModuleChange, onLogout }) {
  const W = collapsed ? 56 : 220

  return (
    <div style={{
      width: W, minWidth: W, maxWidth: W,
      background: T.surface, borderRight: `1px solid ${T.border}`,
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.2s, min-width 0.2s, max-width 0.2s',
      overflow: 'hidden',
      height: '100vh', position: 'sticky', top: 0,
    }}>
      {/* Logo / toggle */}
      <button
        onClick={onToggle}
        style={{
          padding: collapsed ? '18px 0' : '18px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'transparent', border: 'none', cursor: 'pointer',
          borderBottom: `1px solid ${T.border}`,
          justifyContent: collapsed ? 'center' : 'flex-start',
          width: '100%',
        }}
      >
        <img src={logo} style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        }} />
        {!collapsed && (
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.accent, letterSpacing: '0.1em', lineHeight: 1 }}>HENOSIS</div>
            <div style={{ fontSize: 9, color: T.muted, letterSpacing: '0.18em', marginTop: 1 }}>TOOLBOX</div>
          </div>
        )}
        {!collapsed && (
          <div style={{ marginLeft: 'auto', color: T.muted }}>
            <IconMenu />
          </div>
        )}
      </button>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {MODULES.map(m => {
          const isActive = activeModule === m.id
          return (
            <button
              key={m.id}
              onClick={() => !m.soon && onModuleChange(m.id)}
              title={collapsed ? m.label : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: collapsed ? '10px 0' : '10px 12px',
                borderRadius: 8, border: 'none',
                background: isActive ? T.accentDim : 'transparent',
                color: isActive ? T.accent : m.soon ? T.muted : T.text,
                cursor: m.soon ? 'not-allowed' : 'pointer',
                justifyContent: collapsed ? 'center' : 'flex-start',
                transition: 'background 0.15s',
                opacity: m.soon ? 0.6 : 1,
                width: '100%',
              }}
            >
              <span style={{ flexShrink: 0 }}>{m.icon}</span>
              {!collapsed && (
                <>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400 }}>{m.label}</span>
                  {m.soon && (
                    <span style={{
                      marginLeft: 'auto', fontSize: 9, padding: '2px 6px',
                      borderRadius: 4, background: T.border, color: T.muted,
                      letterSpacing: '0.05em',
                    }}>
                      SOON
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px 8px', borderTop: `1px solid ${T.border}` }}>
        <button
          onClick={onLogout}
          title={collapsed ? 'Déconnexion' : undefined}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: collapsed ? '10px 0' : '10px 12px',
            borderRadius: 8, border: 'none',
            background: 'transparent', color: T.muted,
            cursor: 'pointer', width: '100%',
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = T.error}
          onMouseLeave={e => e.currentTarget.style.color = T.muted}
        >
          <IconLogout />
          {!collapsed && <span style={{ fontSize: 13 }}>Déconnexion</span>}
        </button>
      </div>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeModule, setActiveModule] = useState('contrats')

  const moduleLabel = MODULES.find(m => m.id === activeModule)?.label || ''

  return (
    <div style={{
      display: 'flex', height: '100vh', background: T.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: T.text,
    }}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        onLogout={onLogout}
      />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', borderBottom: `1px solid ${T.border}`,
          background: T.surface, flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: T.text }}>{moduleLabel}</span>
          </div>
          <span style={{ fontSize: 12, color: T.muted, letterSpacing: '0.05em' }}>tools.henosis.ch</span>
        </div>

        {/* Module content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          {activeModule === 'contrats' && <ContratModule />}
          {activeModule === 'budget' && <PlaceholderModule name="Budget" />}
          {activeModule === 'affiches' && <PlaceholderModule name="Affiches" />}
          {activeModule === 'kdrive' && <PlaceholderModule name="kDrive" />}
        </div>
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
