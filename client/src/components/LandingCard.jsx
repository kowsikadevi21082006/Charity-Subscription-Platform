export default function LandingCard({ title, description, icon, gradient, delay = '0s' }) {
  return (
    <div className={`rounded-3xl p-8 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] animate-slide-up ${gradient}`} style={{animationDelay: delay}}>
      <div className="text-primary-400 mb-6 bg-primary-500/10 w-fit p-4 rounded-2xl shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-3 text-white tracking-tight">{title}</h3>
      <p className="text-secondary-300 leading-relaxed font-medium">{description}</p>
    </div>
  );
}
