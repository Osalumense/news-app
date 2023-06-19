const ArticleCardLoader = ({ className }) => {
  return (
    <div
      className={`rounded-md overflow-hidden shadow-md ${className} animate-pulse`}
    >
      {/* image */}
      <div className="w-full aspect-video bg-slate-300" />
      <div className="w-36 items-center leading-none text-sm font-medium  bg-slate-300 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block"></div>
      <div className="p-5">
        {/* title */}
        <div className="w-56 h-2 mt-4 bg-slate-300 rounded-lg" />
        {/* caption */}
        <div className="pt-2 pr-0 pb-0 pl-0" />
        <div className="inline text-xs font-medium mt-0  bg-slate-300 mr-1 mb-0 ml-0 underline">
        <div className="inline text-xs font-medium mt-0  bg-slate-300 mr-1 mb-0 ml-1" />
        <div className="w-10 font-bold text-dark-light bg-slate-300 italic text-sm md:text-base" />
          {/* date */}
        </div>
      </div>
    </div>
  );
};

export default ArticleCardLoader;
