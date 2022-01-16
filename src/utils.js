export const getItemText = (i, pawns = []) => {
  let arrayOFIndexes = [];
  pawns.forEach((pawn, colorIndex) => {
    pawn.forEach((point, pawnIndex) => {
      if (point === i) {
        arrayOFIndexes.push({ colorIndex, pawnIndex }); //
      }
    });
  });

  return arrayOFIndexes;
};
export const getColor = (i) => {
  if (
    [
      92, 107, 108, 109, 110, 111, 112, 1, 76, 16, 31, 46, 61, 21, 36, 51, 66,
      77, 78, 79, 80, 81, 2, 3, 4, 5, 6
    ].includes(i)
  )
    return "red";
  else if (
    [
      134, 119, 118, 117, 116, 115, 114, 145, 146, 147, 148, 149, 150, 220, 160,
      175, 190, 205, 165, 180, 195, 210, 221, 222, 223, 224, 225
    ].includes(i)
  ) {
    return "yellow";
  } else if (
    [
      24, 23, 38, 53, 68, 83, 98, 11, 12, 13, 14, 15, 30, 45, 60, 75, 86, 87,
      88, 89, 90, 10, 25, 40, 55, 70, 85
    ].includes(i)
  ) {
    return "green";
  } else if (
    [
      128, 143, 158, 173, 188, 203, 202, 211, 136, 137, 138, 139, 140, 141, 212,
      213, 214, 215, 216, 151, 166, 181, 196, 156, 171, 186, 201
    ].includes(i)
  ) {
    return "blue";
  } else if ([113, 97, 99, 127, 129].includes(i)) {
    return "#abc";
  }
};
