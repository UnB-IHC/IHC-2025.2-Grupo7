function initializeCharts() {
  const canvas = document.getElementById('accessibility-chart');
  
  if (!canvas) return;

  const categories = [
    { 
      key: 'nielsen', 
      label: 'Heurísticas de Nielsen', 
      keywords: ['nielsen', 'heurísticas'], 
      color: '#e04f4f' // Vermelho
    },
    { 
      key: 'wcag', 
      label: 'WCAG 2.2', 
      keywords: ['wcag'], 
      color: '#3261bf' // Azul
    },
    { 
      key: 'guia', 
      label: 'Guia de Boas Práticas', 
      keywords: ['guia', 'boas práticas'], 
      color: '#e0c14f' // roxo
    },
    { 
      key: 'abnt', 
      label: 'ABNT NBR 17225', 
      keywords: ['abnt', 'nbr'], 
      color: '#4fe097' // Verde
    }
  ];

  const categoryData = categories.map(cat => ({ ...cat, checkboxes: [] }));
  let allCheckboxes = [];

  
  const headers = document.querySelectorAll('h2, h3');
  
  headers.forEach(header => {
    const text = header.textContent.toLowerCase();
    
    const matchedCategory = categoryData.find(cat => 
      cat.keywords.some(keyword => text.includes(keyword))
    );

    if (matchedCategory) {
      let currentNode = header;

      while (currentNode && currentNode.nextElementSibling) {
        currentNode = currentNode.nextElementSibling;
        if (['H2', 'H3'].includes(currentNode.tagName)) break;
        
        const inputs = currentNode.querySelectorAll('input[type="checkbox"]');
        inputs.forEach(input => {
          matchedCategory.checkboxes.push(input);
          allCheckboxes.push(input);
        });
      }
    }
  });

  if (allCheckboxes.length === 0) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        borderWidth: 0,
        hoverOffset: 10 // <--- EFEITO VISUAL: A fatia expande ao passar o mouse
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      // --- CONFIGURAÇÃO DE INTERAÇÃO (CRUCIAL PARA FLUIDEZ) ---
      interaction: {
        mode: 'nearest',
        intersect: true,
        axis: 'r' // Otimiza para gráficos radiais
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { usePointStyle: true, padding: 15 }
        },
        title: {
          display: true,
          text: 'Progresso Geral',
          font: { size: 16 }
        },
        tooltip: {
          enabled: true,
          // Otimização de performance: desliga animação do tooltip para aparecer mais rápido
          animation: {
            duration: 0
          },
          callbacks: {
            label: function(context) {
              // Pega o label e valor direto do contexto do Chart.js
              const label = context.label || '';
              const value = context.raw;

              if (label === 'Pendente') { // Comparação exata é mais rápida que includes
                 return `Faltam: ${value} itens`;
              }
              
              // (Removi o 't' que estava solto aqui no seu código original)

              // Busca exata pelo Label para garantir que achou o objeto certo
              const catObj = categoryData.find(c => c.label === label);
              
              if (catObj) {
                const total = catObj.checkboxes.length;
                return `${value}/${total} de ${catObj.label}`;
              }
              
              return `${value} itens`;
            }
          }
        }
      }
    }
  });

  const updateChartInfo = () => {

    const totalGlobal = allCheckboxes.length;
    const checkedGlobal = allCheckboxes.filter(cb => cb.checked).length;
    const remainingGlobal = totalGlobal - checkedGlobal;
    const percentGlobal = totalGlobal > 0 ? Math.round((checkedGlobal / totalGlobal) * 100) : 0;

    let chartData = [];
    let chartColors = [];
    let chartLabels = [];

    categoryData.forEach(cat => {
      if (cat.checkboxes.length === 0) return;

      const checkedCount = cat.checkboxes.filter(cb => cb.checked).length;
      
      if (checkedCount > 0) {
        chartData.push(checkedCount);
        chartColors.push(cat.color);
        chartLabels.push(cat.label);
      }
    });

    if (remainingGlobal > 0) {
      chartData.push(remainingGlobal);
      chartColors.push('#858585');
      chartLabels.push('Pendente');
    } else if (totalGlobal > 0 && chartData.length === 0) {
        
        chartData.push(remainingGlobal);
        chartColors.push('#858585');
        chartLabels.push('Pendente');
    }

    // 3. Atualiza o gráfico
    chart.data.datasets[0].data = chartData;
    chart.data.datasets[0].backgroundColor = chartColors;
    chart.data.labels = chartLabels;
    
    // Atualiza o Título com a Porcentagem Geral
    chart.options.plugins.title.text = `Progresso Total: ${percentGlobal}%`;

    chart.update();
  };

  // Inicializa e adiciona listeners
  updateChartInfo();
  allCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateChartInfo);
  });
}

// Inicialização compatível com MkDocs (Material) e HTML padrão
if (typeof document$ !== "undefined") {
  document$.subscribe(function() {
    initializeCharts();
  });
} else {
  document.addEventListener("DOMContentLoaded", initializeCharts);
}