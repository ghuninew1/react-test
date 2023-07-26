import useGoogleSheets from 'use-google-sheets';
import './Sheet.css';

const REACT_APP_GOOGLE_API_KEY = 'AIzaSyAxLvmYbYnjUsLtA-Hsqc3ww7QLdpD9Sss';
const REACT_APP_GOOGLE_SHEETS_ID = '1pBMvHQc386pIcTNsuwui3Xi4c3EQJkmFudN_N1kvWMY';
const sheetsOptions = [{ id: 'product'}];

export default function Sheet() {
  const { data, loading, error, refetch } = useGoogleSheets({
    apiKey: REACT_APP_GOOGLE_API_KEY,
    sheetId: REACT_APP_GOOGLE_SHEETS_ID,
    sheetsOptions,
  });
   const datas = JSON.stringify(data.map(a=> a.data.map(b=>b)));
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className="sheet">
      <button onClick={refetch}>RF</button>
      <div className="rows">{datas}</div>
    </div>
  );
}