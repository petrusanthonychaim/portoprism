
const formatDate = (date) => {
  const reFormatDate = new Date(date);

return reFormatDate.toLocaleDateString("id-ID",options)
};

module.exports = { formatDate };

// const formatDate = (date) => {
//   const reFormatDate = new Date(date);
//   let options = {
//     year: "2-digit",
//     month: "short",
//   };
// return reFormatDate.toLocaleDateString("id-ID",options)
// };