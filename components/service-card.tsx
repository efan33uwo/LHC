type ServiceCardProps = {
  title: string;
  description: string;
  icon?: string;
};

export default function ServiceCard({
  title,
  description,
  icon,
}: ServiceCardProps) {
  return (
    <article className="border-b border-green-200 pb-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-800">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}