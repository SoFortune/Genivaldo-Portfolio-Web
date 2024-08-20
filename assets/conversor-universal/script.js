document.addEventListener("DOMContentLoaded", function() {
  const welcomeText = "Boas-vindas ao Conversor de Unidades!";
  const typedText = document.getElementById("welcome-text");
  const conversionArea = document.getElementById("conversion-area");
  const categoryField = document.getElementById("category");
  const inputField = document.getElementById("input-value");
  const fromUnitField = document.getElementById("from-unit");
  const toUnitField = document.getElementById("to-unit");
  const convertBtn = document.getElementById("convert-btn");
  const calculationSteps = document.getElementById("calculation-steps");
  const conversionResult = document.getElementById("conversion-result");

  let i = 0;

  function typeWriter() {
      if (i < welcomeText.length) {
          typedText.textContent += welcomeText.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
      } else {
          setTimeout(() => {
              typedText.style.animation = 'shrink-header 0.5s forwards';
              setTimeout(() => {
                  conversionArea.classList.remove('hidden');
                  typedText.classList.add('hidden');
              }, 500);
          }, 500);
      }
  }
  typeWriter();

  const units = {
      length: {
          'cm': { name: 'Centímetros', factor: 0.01 },
          'm': { name: 'Metros', factor: 1 },
          'km': { name: 'Quilômetros', factor: 1000 },
          'in': { name: 'Polegadas', factor: 0.0254 },
          'ft': { name: 'Pés', factor: 0.3048 },
          'yd': { name: 'Jardas', factor: 0.9144 },
          'mi': { name: 'Milhas', factor: 1609.34 }
      },
      capacity: {
          'ml': { name: 'Mililitros', factor: 0.001 },
          'l': { name: 'Litros', factor: 1 },
          'm3': { name: 'Metros cúbicos', factor: 1000 },
          'gal': { name: 'Galões', factor: 3.78541 },
          'qt': { name: 'Quartos', factor: 0.946353 }
      },
      mass: {
          'mg': { name: 'Miligramas', factor: 0.000001 },
          'g': { name: 'Gramas', factor: 0.001 },
          'kg': { name: 'Quilogramas', factor: 1 },
          't': { name: 'Toneladas', factor: 1000 },
          'lb': { name: 'Libras', factor: 0.453592 },
          'oz': { name: 'Onças', factor: 0.0283495 }
      },
      surface: {
          'cm2': { name: 'Centímetros quadrados', factor: 0.0001 },
          'm2': { name: 'Metros quadrados', factor: 1 },
          'km2': { name: 'Quilômetros quadrados', factor: 1000000 },
          'ac': { name: 'Acres', factor: 4046.86 },
          'ha': { name: 'Hectares', factor: 10000 }
      },
      volume: {
          'cm3': { name: 'Centímetros cúbicos', factor: 0.000001 },
          'm3': { name: 'Metros cúbicos', factor: 1 },
          'l': { name: 'Litros', factor: 0.001 },
          'ml': { name: 'Mililitros', factor: 0.000001 },
          'in3': { name: 'Polegadas cúbicas', factor: 0.0000163871 },
          'ft3': { name: 'Pés cúbicos', factor: 0.0283168 }
      },
      time: {
          's': { name: 'Segundos', factor: 1 },
          'min': { name: 'Minutos', factor: 60 },
          'h': { name: 'Horas', factor: 3600 },
          'd': { name: 'Dias', factor: 86400 },
          'wk': { name: 'Semanas', factor: 604800 },
          'mo': { name: 'Meses', factor: 2628000 },
          'yr': { name: 'Anos', factor: 31536000 }
      },
      agricultural: {
          'ha': { name: 'Hectares', factor: 10000 },
          'ac': { name: 'Acres', factor: 4046.86 },
          'm2': { name: 'Metros quadrados', factor: 1 },
          'km2': { name: 'Quilômetros quadrados', factor: 1000000 },
          'a': { name: 'Ares', factor: 100 }
      }
  };

  categoryField.addEventListener('change', function() {
      const category = categoryField.value;
      fromUnitField.innerHTML = '';
      toUnitField.innerHTML = '';

      if (units[category]) {
          Object.keys(units[category]).forEach(unit => {
              const option1 = document.createElement('option');
              option1.value = unit;
              option1.textContent = units[category][unit].name;
              fromUnitField.appendChild(option1);

              const option2 = document.createElement('option');
              option2.value = unit;
              option2.textContent = units[category][unit].name;
              toUnitField.appendChild(option2);
          });
      }
  });


  convertBtn.addEventListener('click', function() {
      const value = parseFloat(inputField.value);
      const fromUnit = fromUnitField.value;
      const toUnit = toUnitField.value;
      const category = categoryField.value;

      if (isNaN(value) || fromUnit === "" || toUnit === "" || category === "") {
          alert("Por favor, insira um valor, selecione as unidades e a categoria.");
          return;
      }

      let convertedValue;
      let stepByStep = "";

      if (units[category] && units[category][fromUnit] && units[category][toUnit]) {
          const fromFactor = units[category][fromUnit].factor;
          const toFactor = units[category][toUnit].factor;


          convertedValue = (value * fromFactor) / toFactor;
          stepByStep = `${value} ${units[category][fromUnit].name} * ${fromFactor} / ${toFactor} = ${convertedValue} ${units[category][toUnit].name}`;
      } else {
          stepByStep = `Conversão entre ${units[category][fromUnit].name} e ${units[category][toUnit].name} não suportada diretamente.`;
          convertedValue = "Erro";
      }

      calculationSteps.innerHTML = `<p>${stepByStep}</p>`;
      conversionResult.innerHTML = `<p>${convertedValue} ${units[category][toUnit].name}</p>`;
      calculationSteps.classList.remove('hidden');
      conversionResult.classList.remove('hidden');
  });
});
