import React from "react";

type PageIllustrationProps = {
  multiple?: boolean;
};

const PageIllustration: React.FC<PageIllustrationProps> = ({
  multiple = false,
}) => {
  return (
    <>
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/4"
        aria-hidden="true"
      >
        <img
          className="max-w-none"
          src="/assets/images/page-illustration.svg"
          width={846}
          height={594}
          alt="Page illustration"
        />
      </div>

      {multiple && (
        <>
          <div
            className="pointer-events-none absolute left-1/2 top-[400px] -z-10 -mt-20 -translate-x-full opacity-50"
            aria-hidden="true"
          >
            <img
              className="max-w-none"
              src="/assets/images/blurred-shape-gray.svg"
              width={760}
              height={668}
              alt="Blurred shape gray"
            />
          </div>

          <div
            className="pointer-events-none absolute left-1/2 top-[440px] -z-10 -translate-x-1/3"
            aria-hidden="true"
          >
            <img
              className="max-w-none"
              src="/assets/images/blurred-shape.svg"
              width={760}
              height={668}
              alt="Blurred shape"
            />
          </div>
        </>
      )}
    </>
  );
};

export default PageIllustration;
