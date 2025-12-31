export default function HomeHeader() {
  return (
    <>
      {/* Logo */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <img
          src="/logoCsc.png"
          alt="CSC logo"
          className="h-20 sm:h-28 w-auto"
        />
      </div>

      {/* Title */}
      <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">
        ກວດສອບການເຮັດວຽກຂອງລະບົບ
      </h1>
    </>
  );
}
