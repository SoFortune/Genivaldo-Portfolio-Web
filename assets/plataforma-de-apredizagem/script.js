let userPoints = 0;
let userLevel = 1;
let username = '';
let currentCourseIndex = 0;
let currentQuestionIndex = 0;

document.getElementById('startButton').addEventListener('click', function() {
  const usernameInput = document.getElementById('usernameInput').value.trim();
  if (usernameInput) {
    username = usernameInput;
    document.getElementById('username').textContent = `Usuário: ${username}`;
    document.getElementById('usernameContainer').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'block';
    renderCourses();
  } else {
    alert('Por favor, insira um nome para começar.');
  }
});

const courses = [
  {
    id: 1,
    title: 'Introdução à Programação',
    questions: [
      { question: 'O que é uma variável?', options: ['Uma caixa de texto', 'Um espaço na memória', 'Um comando'], correct: 1 },
      { question: 'O que é um loop?', options: ['Uma repetição', 'Uma condição', 'Uma função'], correct: 0 },
      { question: 'O que é um array?', options: ['Um número', 'Um texto', 'Uma lista de itens'], correct: 2 },
      { question: 'O que é uma função?', options: ['Um valor', 'Um bloco de código', 'Um tipo de dado'], correct: 1 },
      { question: 'O que é uma classe?', options: ['Um modelo', 'Um dado', 'Um loop'], correct: 0 },
      { question: 'O que é um objeto?', options: ['Uma condição', 'Uma instância de classe', 'Um valor'], correct: 1 },
      { question: 'O que é um operador lógico?', options: ['Um loop', 'Uma condição', 'Um valor'], correct: 1 },
      { question: 'O que é um compilador?', options: ['Um tradutor de código', 'Um tipo de variável', 'Um loop'], correct: 0 },
      { question: 'O que é um IDE?', options: ['Uma linguagem de programação', 'Um ambiente de desenvolvimento', 'Um comando'], correct: 1 }
    ],
    completed: false,
    unlocked: true,
    minPoints: 0
  },
  {
    id: 2,
    title: 'HTML e CSS para Iniciantes',
    questions: [
      { question: 'O que é HTML?', options: ['Uma linguagem de programação', 'Uma linguagem de marcação', 'Uma base de dados'], correct: 1 },
      { question: 'O que é CSS?', options: ['Uma linguagem de marcação', 'Uma folha de estilo', 'Uma função'], correct: 1 },
      { question: 'O que é uma tag HTML?', options: ['Um loop', 'Uma instrução de código', 'Um elemento de marcação'], correct: 2 },
      { question: 'O que é uma classe em CSS?', options: ['Uma função', 'Uma regra de estilo', 'Um loop'], correct: 1 },
      { question: 'Como se define uma cor em CSS?', options: ['Usando tags', 'Usando funções', 'Usando propriedades'], correct: 2 },
      { question: 'O que significa HTML?', options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correct: 0 },
      { question: 'O que é uma ID em CSS?', options: ['Um identificador único', 'Uma classe', 'Um loop'], correct: 0 },
      { question: 'Como se aplica CSS a um elemento?', options: ['Usando um script', 'Usando uma tag', 'Usando uma classe ou ID'], correct: 2 },
      { question: 'O que é uma tag <div>?', options: ['Um comando', 'Um contêiner genérico', 'Uma classe'], correct: 1 }
    ],
    completed: false,
    unlocked: false,
    minPoints: 50
  },
  {
    id: 3,
    title: 'JavaScript Básico',
    questions: [
      { question: 'O que é JavaScript?', options: ['Uma linguagem de programação', 'Uma linguagem de marcação', 'Um banco de dados'], correct: 0 },
      { question: 'Como se declara uma variável em JavaScript?', options: ['var', 'function', 'loop'], correct: 0 },
      { question: 'O que é uma função em JavaScript?', options: ['Um bloco de código executável', 'Uma variável', 'Um operador'], correct: 0 },
      { question: 'O que é um objeto em JavaScript?', options: ['Uma função', 'Um tipo de dado complexo', 'Um valor'], correct: 1 },
      { question: 'Como se cria um array em JavaScript?', options: ['Usando colchetes []', 'Usando chaves {}', 'Usando parênteses ()'], correct: 0 },
      { question: 'O que é o DOM?', options: ['Documento de Mídia', 'Documento de Objetos', 'Document Object Model'], correct: 2 },
      { question: 'Como se faz um loop em JavaScript?', options: ['Usando var', 'Usando while', 'Usando let'], correct: 1 },
      { question: 'O que é uma condição em JavaScript?', options: ['Um teste lógico', 'Um operador', 'Um array'], correct: 0 },
      { question: 'O que é uma API em JavaScript?', options: ['Uma interface de aplicação', 'Uma variável', 'Um array'], correct: 0 }
    ],
    completed: false,
    unlocked: false,
    minPoints: 100
  }
];

function renderCourses() {
  const courseList = document.getElementById('courseList');
  courseList.innerHTML = '';
  courses.forEach(course => {
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    courseItem.innerHTML = `
      <h3>${course.title}</h3>
      <button onclick="handleCourseClick(${course.id})">${course.unlocked ? 'Iniciar Curso' : 'Curso Bloqueado'}</button>
    `;
    courseList.appendChild(courseItem);
  });
}

function handleCourseClick(courseId) {
  const course = courses.find(c => c.id === courseId);
  if (course.unlocked) {
    startCourse(courseId);
  } else {
    alert(`Para acessar o curso "${course.title}", você precisa completar o curso anterior e ter pelo menos ${course.minPoints} pontos.`);
  }
}

function startCourse(courseId) {
  const course = courses.find(c => c.id === courseId);
  currentCourseIndex = courses.indexOf(course);
  currentQuestionIndex = 0;
  renderQuiz();
}

function renderQuiz() {
  const course = courses[currentCourseIndex];
  const quizContainer = document.getElementById('quizContainer');
  quizContainer.innerHTML = '';

  const questionsToShow = course.questions.slice(currentQuestionIndex, currentQuestionIndex + 3);

  questionsToShow.forEach((q, index) => {
    const questionItem = document.createElement('div');
    questionItem.className = 'quiz-question-card';
    questionItem.innerHTML = `
      <div class="quiz-question">
        <p>${q.question}</p>
        ${q.options.map((option, i) => `
          <label>
            <input type="radio" name="question${index}" value="${i}"> ${option}
          </label>
        `).join('')}
      </div>
    `;
    quizContainer.appendChild(questionItem);
  });

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Enviar Respostas';
  submitButton.onclick = checkQuizAnswers;
  quizContainer.appendChild(submitButton);

  updateProgress(); // Atualiza a barra de progresso
}

function updateProgress() {
  const course = courses[currentCourseIndex];
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  const totalQuestions = course.questions.length;
  const answeredQuestions = currentQuestionIndex > totalQuestions ? totalQuestions : currentQuestionIndex;

  const progress = (answeredQuestions / totalQuestions) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${Math.round(progress)}%`;
}

function checkQuizAnswers() {
  let score = 0;
  const course = courses[currentCourseIndex];
  const questionsToShow = course.questions.slice(currentQuestionIndex, currentQuestionIndex + 3);

  questionsToShow.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    const options = document.querySelectorAll(`input[name="question${index}"]`);

    options.forEach((option, i) => {
      const label = option.parentElement;
      if (i === q.correct) {
        label.classList.add('correct-answer');
      }
      if (selectedOption && parseInt(selectedOption.value) === i && i !== q.correct) {
        label.classList.add('wrong-answer');
      }
    });

    if (selectedOption && parseInt(selectedOption.value) === q.correct) {
      score += 10;
    }
  });

  setTimeout(() => {
    alert(`Você ganhou ${score} pontos no quiz!`);
    updateUserStats(score);

    currentQuestionIndex += 3;

    updateProgress(); // Atualiza a barra de progresso após cada conjunto de perguntas respondidas

    if (currentQuestionIndex < course.questions.length) {
      renderQuiz(); // Mostra as próximas 3 perguntas
    } else {
      course.completed = true;
      checkCourseCompletion();
    }
  }, 500);
}



function checkCourseCompletion() {
  const course = courses[currentCourseIndex];
  
  if (userPoints >= course.minPoints) {
    alert(`Parabéns! Você completou o curso: ${course.title}.`);
    unlockNextCourse();
    renderCourses();
  } else {
    alert(`Você não atingiu a pontuação mínima para desbloquear o próximo curso. Continue praticando.`);
  }
}

function unlockNextCourse() {
  const nextCourseIndex = currentCourseIndex + 1;
  if (nextCourseIndex < courses.length) {
    courses[nextCourseIndex].unlocked = true;
  } else {
    endLearningPath();
  }
}

function endLearningPath() {
  document.getElementById('quizContainer').innerHTML = `<p>Parabéns, ${username}! Você completou todos os cursos. Pontuação final: ${userPoints}. Nível alcançado: ${userLevel}.</p>`;
}

function updateUserStats(points) {
  userPoints += points;
  document.getElementById('points').textContent = `Pontos: ${userPoints}`;

  const newLevel = Math.floor(userPoints / 50) + 1;
  if (newLevel > userLevel) {
    userLevel = newLevel;
    document.getElementById('level').textContent = `Nível: ${userLevel}`;
  }
}

function updateProgress() {
  const course = courses[currentCourseIndex];
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  
  const totalQuestions = course.questions.length;
  const answeredQuestions = currentQuestionIndex > totalQuestions ? totalQuestions : currentQuestionIndex;
  
  const progress = (answeredQuestions / totalQuestions) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${Math.round(progress)}%`;
}

// Efeito de Neon para a setinha
let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove', function(e) {
  const neonLine = document.createElement('div');
  neonLine.classList.add('neon-line');
  document.body.appendChild(neonLine);


  const mouseX = e.pageX;
  const mouseY = e.pageY;

 
  neonLine.style.left = `${lastX}px`;
  neonLine.style.top = `${lastY}px`;

 
  const deltaX = mouseX - lastX;
  const deltaY = mouseY - lastY;
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  
  neonLine.style.width = `${distance}px`;
  neonLine.style.transform = `rotate(${angle}deg)`;

  
  lastX = mouseX;
  lastY = mouseY;

 
  setTimeout(() => {
    neonLine.remove();
  }, 300); // Duração do rastro
});

document.addEventListener('scroll', function() {
  lastX = 0;
  lastY = 0;
});