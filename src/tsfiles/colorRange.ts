export function colorRange(color: number = 1) :number{
  if (color == 1) return Math.random() * 360
  if (color == 2) return Math.random() * 20 + 340
  if (color == 3) return Math.random() * 35 + 5
  if (color == 4) return Math.random() * 30 + 40
  if (color == 5) return Math.random() * 60 + 80
  if (color == 6) return Math.random() * 40 + 170
  if (color == 7) return Math.random() * 55 + 185
  if (color == 8) return Math.random() * 45 + 245
  if (color == 9) return Math.random() * 45 + 290
  return Math.random() * 360
}