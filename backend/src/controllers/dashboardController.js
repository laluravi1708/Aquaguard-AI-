import { analyzeReadings } from '../services/aiEngine.js';
export function summary(req,res){
 const readings=req.app.locals.readings||[]; const total=readings.reduce((s,r)=>s+Number(r.liters),0); const avg=readings.length?total/readings.length:0; const ai=analyzeReadings(readings.map(r=>({flowRate:r.flowRate}))); const alerts=(req.app.locals.alerts||[]).filter(a=>a.status==='open');
 res.json({totalLiters:Math.round(total),avgLiters:Math.round(avg),forecast:Math.round(ai.forecast*60),leaks:alerts.length,saving:Math.max(8,Math.round(total*0.12)),health:alerts.length?'Attention needed':'System healthy'});
}
