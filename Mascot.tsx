import React, { useState } from 'react';
import { motion } from 'motion/react';
import milhitoImage from 'figma:asset/fcb0bd8bad7e75a1355bcb310548b08ccaf1dd71.png';
import milhitoHuggingImage from 'figma:asset/0848d61323876756d0630dc317f3f85653be4e2d.png';

export function Mascot() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHugging, setIsHugging] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1
        }}
        whileHover={{ 
          scale: 1.1,
          y: -10,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsHugging(!isHugging)}
        className="cursor-pointer"
      >
        <div className="relative">
          <motion.img
            src={isHugging ? milhitoHuggingImage : milhitoImage}
            alt={isHugging ? "Milhito abraçando Verdeco" : "Milhito - Mascote da Outono Dourado"}
            className="w-24 h-32 drop-shadow-lg"
            animate={isHovered && !isHugging ? { 
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5, repeat: Infinity }
            } : isHugging ? {
              scale: [1, 1.05, 1],
              transition: { duration: 1, repeat: Infinity }
            } : {}}
            initial={false}
            transition={{ duration: 0.3 }}
          />
          
          {/* Balão de fala que aparece no hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              scale: isHovered ? 1 : 0,
              y: isHovered ? -10 : 0
            }}
            transition={{ duration: 0.2 }}
            className="absolute -top-16 -left-8 bg-white rounded-lg px-3 py-2 shadow-lg border-2 border-[#DF760B] whitespace-nowrap"
          >
            <div className="text-sm text-[#DF760B] font-medium">
              {isHugging ? "Milhito & Verdeco! 💚🧡" : "Olá! Sou o Milhito! 🌱"}
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#DF760B]"></div>
            </div>
          </motion.div>

          {/* Efeito de brilho - muda cor quando abraçando */}
          <motion.div
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: isHugging ? 2 : 3,
            }}
            className={`absolute -top-2 -right-2 w-4 h-4 ${isHugging ? 'bg-green-400' : 'bg-[#F6B61E]'} rounded-full opacity-0`}
          />
          
          {/* Corações quando abraçando */}
          {isHugging && (
            <>
              <motion.div
                animate={{
                  y: [-10, -30],
                  opacity: [1, 0],
                  scale: [0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute -top-4 left-2 text-red-500 text-lg"
              >
                ❤️
              </motion.div>
              
              <motion.div
                animate={{
                  y: [-10, -30],
                  opacity: [1, 0],
                  scale: [0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  delay: 0.5,
                }}
                className="absolute -top-4 right-2 text-red-500 text-sm"
              >
                💚
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}