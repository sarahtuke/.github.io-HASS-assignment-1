async function fetchPSIData() {
    const url = 'https://api.data.gov.sg/v1/environment/psi';
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayPSIReadings(data);
    } catch (error) {
      console.error('Error fetching PSI data:', error);
      document.getElementById('psiReadings').innerHTML = '<p>Error loading PSI data.</p>';
    }
  }
  
  function displayPSIReadings(data) {
    const readings = data.items[0].readings;
    const keys = Object.keys(readings);
    let html = '<table><tr><th>Reading Type</th><th>National</th><th>South</th><th>North</th><th>East</th><th>West</th><th>Central</th></tr>';
    
    keys.forEach(key => {
      html += `<tr><td>${key}</td>`;
      const readingValues = readings[key];
      for (const region in readingValues) {
        html += `<td>${readingValues[region]}</td>`;
      }
      html += '</tr>';
    });
    
    html += '</table>';
    document.getElementById('psiReadings').innerHTML = html;
  }
  
  fetchPSIData();
  