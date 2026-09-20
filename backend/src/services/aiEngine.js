export function analyzeReadings(readings) {
  const values = readings.map(r => Number(r.flowRate || r.liters || 0)).filter(Number.isFinite);
  if (!values.length) return { baseline: 0, anomalies: [], forecast: 0, status: 'normal' };
  const mean = values.reduce((a,b)=>a+b,0)/values.length;
  const variance = values.reduce((s,v)=>s+Math.pow(v-mean,2),0)/values.length;
  const std = Math.sqrt(variance) || 1;
  const threshold = Math.max(mean + 2.2*std, mean*1.65);
  const anomalies = readings.filter(r => Number(r.flowRate) >= threshold).map(r => ({...r, reason:'Usage is significantly above the learned baseline'}));
  const recent = values.slice(-6);
  const recentAvg = recent.reduce((a,b)=>a+b,0)/recent.length;
  const trend = recent.length > 1 ? (recent[recent.length-1]-recent[0])/recent.length : 0;
  const forecast = Math.max(0, recentAvg + trend*3);
  return { baseline:Number(mean.toFixed(2)), threshold:Number(threshold.toFixed(2)), anomalies, forecast:Number(forecast.toFixed(2)), status:anomalies.length ? 'warning':'normal' };
}

export function detectLeak(readings) {
  if (!readings.length) return null;
  const latest = readings[readings.length-1];
  const lastFive = readings.slice(-5);
  const avg = lastFive.reduce((s,r)=>s+Number(r.flowRate),0)/lastFive.length;
  const continuous = lastFive.length >= 4 && lastFive.every(r => Number(r.flowRate) >= avg*0.85);
  const high = Number(latest.flowRate) >= avg*1.5 || Number(latest.flowRate) >= 12;
  if (continuous && high) {
    return { severity:Number(latest.flowRate)>=18?'critical':'high', message:'Possible continuous leakage detected', estimatedLiters:Math.round(Number(latest.flowRate)*60*2) };
  }
  return null;
}
