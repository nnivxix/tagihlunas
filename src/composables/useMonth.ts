/* eslint-disable no-octal */
const useMonth = (nmr: number) => {
  let month :string|null = '';
  if(nmr === 1){
      month = 'January';
  }else if(nmr === 2){
      month = 'February';
  }else if(nmr === 3){
      month = 'March';
  }else if(nmr === 4){
      month = 'April';
  }else if(nmr === 5){
      month = 'May';
  }else if(nmr === 6){
      month = 'Juny';
  }else if(nmr === 7){
      month = 'July';
  }else if(nmr === 8){
      month = 'August';
  }else if(nmr === 9){
      month = 'September';
  }else if(nmr === 10){
      month = 'October';
  }else if(nmr === 11){
      month = 'November';
  }else if(nmr ===12){
      month = 'Desember';
  }else{
      month = null;
  }
  return month;
};

export default useMonth;