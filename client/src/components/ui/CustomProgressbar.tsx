// import { motion } from "framer-motion";
// import React from "react";

// interface ProgressBarProps {
//   progress: number;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
//   const clampedProgress = Math.min(Math.max(progress, 0), 100);

//   return (
//     <div
//       className="bg-gray-200 h-2 sm:h-3 w-full rounded-full overflow-hidden relative"
//       role="progressbar"
//       aria-label={`Progress: ${clampedProgress}%`}
//       aria-valuenow={clampedProgress}
//       aria-valuemin={0}
//       aria-valuemax={100}
//     >
//       <motion.div
//         className="h-2 sm:h-3 absolute inset-0"
//         style={{
//           width: `${clampedProgress}%`,
//           background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
//         }}
//         initial={{ width: "0%" }}
//         animate={{ width: `${clampedProgress}%` }}
//         transition={{ duration: 0.4, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="h-2 sm:h-3 absolute inset-0"
//         style={{
//           width: `${clampedProgress}%`,
//           backgroundImage: `
//             url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 10'%3E%3Cpath fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='1' d='M0 5s4-3 10 0 10 0 10 0'/%3E%3C/svg%3E")
//           `,
//           backgroundSize: "15px 8px sm:20px 10px",
//           backgroundRepeat: "repeat-x",
//         }}
//         animate={{
//           backgroundPositionX: ["0%", "-100%"],
//         }}
//         transition={{
//           backgroundPositionX: {
//             duration: 2,
//             repeat: Infinity,
//             ease: "linear",
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default ProgressBar;
// import { motion } from "framer-motion";
// import React from "react";

// interface ProgressBarProps {
//   progress: number;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
//   const clampedProgress = Math.min(Math.max(progress, 0), 100);

//   return (
//     <div
//       className="bg-gray-200 h-3 sm:h-4 w-full rounded-full overflow-hidden relative"
//       role="progressbar"
//       aria-label={`Progress: ${clampedProgress}%`}
//       aria-valuenow={clampedProgress}
//       aria-valuemin={0}
//       aria-valuemax={100}
//     >
//       <motion.div
//         className="h-3 sm:h-4 absolute inset-0"
//         style={{
//           width: `${clampedProgress}%`,
//           background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
//         }}
//         initial={{ width: "0%" }}
//         animate={{ width: `${clampedProgress}%` }}
//         transition={{ duration: 0.4, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="h-3 sm:h-4 absolute inset-0"
//         style={{
//           width: `${clampedProgress}%`,
//           backgroundImage: `
//             url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 12'%3E%3Cpath fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='1.5' d='M0 6s5-4 10 0 10 0 10 0'/%3E%3C/svg%3E")
//           `,
//           backgroundSize: "20px 12px sm:25px 14px",
//           backgroundRepeat: "repeat-x",
//         }}
//         animate={{
//           backgroundPositionX: ["0%", "-100%"],
//         }}
//         transition={{
//           backgroundPositionX: {
//             duration: 1.5,
//             repeat: Infinity,
//             ease: "linear",
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default ProgressBar;
import { motion } from "framer-motion";
import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className="bg-gray-200 h-3 sm:h-4 w-full rounded-full overflow-hidden relative"
      role="progressbar"
      aria-label={`Progress: ${clampedProgress}%`}
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-3 sm:h-4 absolute inset-0 rounded-full"
        style={{
          width: `${clampedProgress}%`,
          background: "linear-gradient(90deg,  #06b6d4 , #3b82f6)",
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      <motion.div
        className="h-3 sm:h-4 absolute inset-0"
        style={{
          width: `${clampedProgress}%`,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 12'%3E%3Cpath fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='1.5' d='M0 6s5-4 10 0 10 0 10 0'/%3E%3C/svg%3E")
          `,
          backgroundSize: "20px 12px sm:25px 14px",
          backgroundRepeat: "repeat-x",
        }}
        animate={{
          backgroundPositionX: ["0%", "-100%"],
        }}
        transition={{
          backgroundPositionX: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />
    </div>
  );
};

export default ProgressBar;
