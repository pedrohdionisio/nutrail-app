export const ptBR = {
  common: {
    back: 'Voltar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    save: 'Salvar',
    confirm: 'Confirmar',
    dateInputPlaceholder: 'DD/MM/AAAA',
    retry: 'Tentar de novo',
    loading: 'Carregando',
    continue: 'Continuar',
    email: 'E-mail',
    password: 'Senha',
    calories: 'Calorias',
    protein: 'Proteínas',
    carbohydrate: 'Carboidratos',
    fat: 'Gorduras',
    carbohydrateShort: 'Carbos',
    aiLoadingHint: 'Isso pode levar alguns segundos.',
    totalMacros: 'Macros Totais',
    ingredients: 'Ingredientes',
    instructions: 'Modo de preparo',
    mealTime: 'Horário · {{time}}',
    mealTimeLabel: 'Horário da refeição: {{time}}',
    mealTimeHint: 'Altera o horário da refeição',
    deleteMealTitle: 'Excluir refeição?',
    deleteMealDescription: 'A refeição e a foto serão apagadas. Essa ação não pode ser desfeita.',
    signOut: 'Sair',
    connectionHint: 'Verifique sua conexão e tente de novo.',
    invalidTimeTitle: 'Horário inválido',
    futureTimeMessage: 'O horário da refeição não pode estar no futuro.',
    close: 'Fechar',
    tryAgainSoon: 'Tente de novo em alguns instantes.',
    mealTimeTitle: 'Horário da refeição',
    openSettings: 'Abrir ajustes',
    date: 'Data',
    time: 'Horário',
    mealPicture: 'Foto da refeição',
    addPicture: 'Adicionar foto',
    meal: 'Refeição',
    name: 'Nome',
    photosError: 'Não foi possível abrir suas fotos',
    uploadPictureError: 'Não foi possível enviar a foto',
    retryFailed: 'Não foi possível tentar de novo',
    analyzingWithAi: 'Estamos calculando seus macros com ajuda da inteligência artificial',
    analysisSlowTitle: 'A análise está demorando',
    analysisSlowMessage: 'Sua refeição vai aparecer na lista assim que ficar pronta.',
    editMeal: 'Editar refeição',
    saveMeal: 'Salvar refeição'
  },
  language: {
    title: 'Idioma',
    'pt-BR': 'Português',
    'en-US': 'English'
  },
  options: {
    goal: {
      LOSE: 'Perder peso',
      MAINTAIN: 'Manter peso',
      GAIN: 'Ganhar peso'
    },
    gender: {
      MALE: 'Masculino',
      FEMALE: 'Feminino'
    },
    activityLevel: {
      SEDENTARY: 'Sedentário',
      LIGHT: 'Leve',
      MODERATE: 'Moderado',
      HEAVY: 'Pesado',
      ATHLETE: 'Atleta'
    },
    activityLevelDescription: {
      SEDENTARY: 'Não me exercito',
      LIGHT: '1 a 2 vezes por semana',
      MODERATE: '3 a 5 vezes por semana',
      HEAVY: '6 a 7 vezes por semana',
      ATHLETE: 'Mais de 7 vezes por semana'
    }
  },
  validation: {
    nameRequired: 'Informe seu nome',
    nameTooLong: 'O nome é muito longo',
    invalidDate: 'Informe uma data válida',
    futureDate: 'A data não pode estar no futuro',
    heightInCentimeters: 'Informe a altura em centímetros',
    weightInKilograms: 'Informe o peso em quilos',
    genderRequired: 'Escolha um gênero',
    goalRequired: 'Escolha um objetivo',
    activityLevelRequired: 'Escolha um nível de atividade',
    currentPasswordRequired: 'Informe a senha atual',
    passwordTooShort: 'A senha deve ter no mínimo 8 caracteres',
    passwordTooLong: 'A senha deve ter no máximo 256 caracteres',
    passwordsMismatch: 'As senhas não conferem',
    emailInvalid: 'Formato de e-mail inválido',
    emailTooLong: 'O e-mail é muito longo',
    passwordRequired: 'Informe sua senha',
    codeRequired: 'Informe o código que chegou por e-mail',
    descriptionMax1000: 'A descrição pode ter no máximo 1000 caracteres',
    descriptionMax500: 'A descrição pode ter no máximo 500 caracteres',
    caloriesPositive: 'A meta de calorias precisa ser maior que zero',
    quantityPositive: 'A quantidade precisa ser maior que zero',
    itemsMax: 'A refeição pode ter no máximo 50 itens',
    ingredientsRequired: 'Conte o que você tem em casa',
    foodToAddRequired: 'Descreva o alimento que você quer adicionar',
    mealDescriptionRequired: 'Descreva o que você comeu',
    savedMealNameRequired: 'Dê um nome para a refeição',
    mealNameRequired: 'Informe o nome da refeição',
    invalidTime: 'Informe um horário válido',
    wholeNumber: 'Informe um número inteiro',
    invalidQuantity: 'Informe uma quantidade válida',
    itemsRequired: 'Mantenha pelo menos um item na refeição',
    futureTime: 'O horário não pode estar no futuro',
    nameMax120: 'O nome pode ter no máximo 120 caracteres',
    nameMax60: 'O nome pode ter no máximo 60 caracteres'
  },
  errors: {
    network: 'Não foi possível falar com o servidor. Verifique sua conexão.',
    fallback: 'Não foi possível concluir a ação. Tente novamente.',
    VALIDATION: 'Confira os dados informados e tente de novo.',
    UNAUTHORIZED: 'Sua sessão expirou. Entre de novo.',
    INVALID_REFRESH_TOKEN: 'Sua sessão expirou. Entre de novo.',
    INVALID_CREDENTIALS: 'E-mail ou senha incorretos.',
    INVALID_CURRENT_PASSWORD: 'A senha atual está incorreta.',
    EMAIL_ALREADY_IN_USE: 'Este e-mail já está em uso.',
    INVALID_CODE: 'Código inválido ou expirado.',
    TOO_MANY_ATTEMPTS: 'Muitas tentativas. Aguarde um pouco e tente de novo.',
    USER_NOT_FOUND: 'Usuário não encontrado.',
    MEAL_NOT_FOUND: 'Refeição não encontrada.',
    MEAL_NOT_EDITABLE: 'Só é possível editar refeições que já foram processadas.',
    MEAL_NOT_SAVABLE: 'Só é possível salvar refeições que já foram processadas.',
    MEAL_WITHOUT_ITEMS: 'Nenhum alimento foi identificado na refeição.',
    MEAL_ANALYSIS_FAILED: 'Não conseguimos analisar a refeição. Tente de novo.',
    MEAL_PICTURE_NOT_ALLOWED: 'Não é possível trocar a foto desta refeição agora.',
    INVALID_MEAL_TRANSITION: 'Esta refeição não pode ser alterada agora.',
    NO_FOOD_INGREDIENTS: 'Não identificamos nenhum alimento na descrição.',
    GOALS_BELOW_MACROS: 'As calorias não cobrem suas metas de proteína e gordura.',
    RECIPE_NOT_FOUND: 'Receita não encontrada.',
    SAVED_MEAL_NOT_FOUND: 'Refeição salva não encontrada.',
    RECIPE_GENERATION_FAILED: 'Não conseguimos gerar uma receita. Tente de novo.'
  },
  profile: {
    title: 'Perfil',
    signOut: 'Sair',
    name: 'Nome',
    birthDate: 'Data de nascimento',
    height: 'Altura',
    weight: 'Peso',
    gender: 'Sexo',
    goal: 'Objetivo',
    activityLevel: 'Nível de atividade',
    goalsRecalculated:
      'Ao salvar, suas metas de calorias e macros são recalculadas a partir destes dados.',
    changePassword: 'Alterar senha',
    deleteAccount: 'Excluir conta',
    currentPassword: 'Senha atual',
    newPassword: 'Nova senha',
    newPasswordConfirmation: 'Confirme a nova senha',
    saveNewPassword: 'Salvar nova senha',
    passwordChangedTitle: 'Senha alterada',
    passwordChangedMessage: 'Use a nova senha na próxima vez que entrar.',
    deleteAccountTitle: 'Excluir conta?',
    deleteAccountDescription:
      'Seu perfil, suas refeições, fotos e receitas serão apagados para sempre. Essa ação não pode ser desfeita.',
    goalsRecalculatedShort: 'Ao salvar, suas metas diárias são recalculadas.'
  },
  welcome: {
    title: 'Controle sua dieta de forma simples',
    createAccount: 'Criar Conta',
    haveAccount: 'Já tem conta?',
    signInAction: 'Acessar conta',
    forgotPassword: 'Esqueceu a senha?',
    recoverPasswordAction: 'Recuperar senha',
    signInTitle: 'Entre em sua conta',
    signIn: 'Entrar',
    forgotPasswordTitle: 'Recupere sua senha',
    forgotPasswordDescription:
      'Informe o e-mail da sua conta e enviaremos um código para você criar uma senha nova.',
    sendCode: 'Enviar código',
    resetPasswordTitle: 'Crie uma nova senha',
    code: 'Código',
    resendCode: 'Reenviar código',
    resetPasswordDescription: 'Enviamos um código para {{email}}. Confira também a caixa de spam.',
    passwordResetTitle: 'Senha alterada',
    passwordResetMessage: 'Entre com a sua nova senha.',
    codeResentTitle: 'Código reenviado',
    codeResentMessage: 'Enviamos um novo código para {{email}}.'
  },
  onboarding: {
    steps: {
      goal: {
        title: 'Qual é seu objetivo?',
        description: 'O que você pretende alcançar com a dieta?'
      },
      gender: {
        title: 'Qual o seu gênero biológico?',
        description: 'Seu gênero influencia no tipo da dieta'
      },
      birthDate: {
        title: 'Que dia você nasceu?',
        description: 'Cada faixa etária responde de forma única'
      },
      height: {
        title: 'Qual é sua altura?',
        description: 'Você pode inserir uma estimativa'
      },
      weight: {
        title: 'Qual é seu peso?',
        description: 'Você pode inserir uma estimativa'
      },
      activityLevel: {
        title: 'Qual seu nível de atividade?'
      },
      account: {
        title: 'Crie sua conta',
        description: 'Para poder visualizar seu progresso'
      }
    },
    createAccount: 'Criar conta',
    heightLabel: 'Altura (cm)',
    weightLabel: 'Peso (kg)',
    name: 'Nome',
    namePlaceholder: 'Seu nome',
    emailPlaceholder: 'voce@email.com',
    passwordPlaceholder: 'Mínimo 8 caracteres',
    passwordConfirmation: 'Confirmar Senha',
    birthDate: 'Data de nascimento',
    planErrorTitle: 'Não conseguimos montar seu plano',
    planErrorMessage: 'Sua conta foi criada. Verifique sua conexão e tente de novo.',
    personalizing: 'Estamos personalizando o app para você',
    planTitlePrefix: 'Seu plano de dieta para',
    planTitleSuffix: 'está pronto!',
    planDescription:
      'Essa é a meta diária recomendada para o seu plano. Fique tranquilo, você poderá editar depois caso deseje.',
    startPlan: 'Começar meu plano',
    goalSummary: {
      LOSE: 'Perder Peso',
      MAINTAIN: 'Manter Peso',
      GAIN: 'Ganhar Peso'
    }
  },
  appError: {
    message: 'O app encontrou um erro inesperado. Tente de novo; se continuar, feche e abra o app.',
    title: 'Algo deu errado'
  },
  home: {
    chooseDay: 'Escolher dia',
    retryFailed: 'Não foi possível tentar de novo',
    today: 'Hoje',
    yesterday: 'Ontem',
    dayLabel: '{{day}}, {{date}} de {{month}}',
    loadingMeals: 'Carregando refeições',
    mealsErrorTitle: 'Não conseguimos carregar suas refeições',
    emptyMeals: 'Nenhuma refeição registrada neste dia. Cadastre por uma das opções abaixo:',
    newMealTitle: 'Cadastre sua refeição',
    savedMealLabel: 'Refeição salva',
    savedMealAccessibility: 'Cadastrar refeição salva',
    manualMealLabel: 'Refeição manual',
    manualMealAccessibility: 'Cadastrar refeição manualmente',
    audioLabel: 'Áudio',
    audioAccessibility: 'Cadastrar refeição por áudio',
    pictureLabel: 'Foto',
    pictureAccessibility: 'Cadastrar refeição por foto',
    addMeal: 'Cadastrar refeição',
    previousDay: 'Dia anterior',
    nextDay: 'Próximo dia',
    chooseDayHint: 'Abre o calendário para escolher o dia',
    chooseDayLabel: 'Escolher dia: {{label}}',
    dataErrorTitle: 'Não conseguimos carregar seus dados',
    profile: 'Perfil',
    recipes: 'Receitas',
    goals: 'Metas',
    deleteMeal: 'Excluir refeição',
    openMealHint: 'Abre os detalhes da refeição',
    analyzing: 'Analisando',
    analyzingMessage:
      'Estamos calculando os macros. A refeição entra no resumo do dia assim que ficar pronta.',
    failedMessage:
      'Não conseguimos analisar esta refeição. Tente de novo ou exclua deslizando para o lado.',
    caloriesLeft: '{{count}} kcal restantes',
    caloriesOver: '{{count}} kcal acima da meta',
    fallbackTitle: {
      ANALYZED: 'Refeição',
      ANALYZING: 'Analisando refeição',
      FAILED: 'Refeição não analisada'
    },
    weekdays: {
      '0': 'Domingo',
      '1': 'Segunda',
      '2': 'Terça',
      '3': 'Quarta',
      '4': 'Quinta',
      '5': 'Sexta',
      '6': 'Sábado'
    },
    months: {
      '0': 'janeiro',
      '1': 'fevereiro',
      '2': 'março',
      '3': 'abril',
      '4': 'maio',
      '5': 'junho',
      '6': 'julho',
      '7': 'agosto',
      '8': 'setembro',
      '9': 'outubro',
      '10': 'novembro',
      '11': 'dezembro'
    },
    mealsTitle: 'Refeições',
    greeting: 'Olá,'
  },
  pictureMeal: {
    confirm: 'Confirmar foto',
    discard: 'Descartar foto',
    captureError: 'Não foi possível tirar a foto',
    analysisFailedTitle: 'Não conseguimos analisar a foto',
    analysisFailedMessage: 'Tente de novo ou use outra foto, com os alimentos bem visíveis.',
    openingCamera: 'Abrindo a câmera',
    cameraPermission:
      'Permita o acesso à câmera para fotografar sua refeição, ou escolha uma foto da galeria.',
    allowCamera: 'Permitir câmera',
    take: 'Tirar foto',
    takeLabel: 'Tirar Foto',
    chooseFromGallery: 'Escolher foto da galeria',
    gallery: 'Galeria'
  },
  audioMeal: {
    confirm: 'Confirmar áudio',
    discard: 'Descartar áudio',
    recordError: 'Não foi possível gravar o áudio',
    saveError: 'Não foi possível salvar o áudio',
    recordAgain: 'Tente gravar de novo.',
    uploadError: 'Não foi possível enviar o áudio',
    analysisFailedTitle: 'Não conseguimos entender o áudio',
    analysisFailedMessage:
      'Tente de novo ou grave outra vez, dizendo os alimentos e as quantidades.',
    stopRecording: 'Parar gravação',
    stop: 'Parar',
    record: 'Gravar áudio',
    recordLabel: 'Gravar',
    preparingMicrophone: 'Preparando o microfone',
    microphonePermission: 'Permita o acesso ao microfone para gravar a descrição da sua refeição.',
    allowMicrophone: 'Permitir microfone',
    pause: 'Pausar áudio',
    play: 'Ouvir áudio',
    hints: {
      IDLE: 'Toque em gravar e conte o que você comeu, com as quantidades. Por exemplo: “dois ovos mexidos e uma fatia de pão integral”.',
      RECORDING: 'Gravando. Toque em parar quando terminar.',
      RECORDED: 'Ouça o áudio, se quiser, e confirme para calcular os macros.'
    }
  },
  manualMeal: {
    title: 'Refeição manual',
    pictureFailedTitle: 'Refeição cadastrada sem a foto',
    pictureFailedMessage: 'Os macros foram calculados, mas não conseguimos enviar a foto.',
    whatDidYouEat: 'O que você comeu?',
    descriptionPlaceholder: 'Ex.: 2 ovos mexidos, 1 pão francês com manteiga e um café com leite',
    optionalPicture: 'Foto (opcional)',
    removePicture: 'Remover foto',
    calculate: 'Calcular macros'
  },
  mealDetails: {
    sendingPicture: 'Enviando foto',
    changePicture: 'Trocar foto',
    items: 'Itens',
    itemMacros: '{{protein}}g prot · {{carbohydrate}}g carb · {{fat}}g gord',
    saveDescription:
      'Os itens e macros ficam guardados para você cadastrar esta refeição de novo com um toque.',
    savePlaceholder: 'Ex.: Café da manhã de sempre',
    savedTitle: 'Refeição salva',
    savedMessage: 'Cadastre de novo quando quiser, em "Refeição salva".',
    loading: 'Carregando refeição'
  },
  editMeal: {
    removeItem: 'Remover {{name}}',
    addFood: 'Adicionar alimento',
    addFoodPlaceholder: 'Ex.: 2 colheres de sopa de azeite',
    add: 'Adicionar',
    mealName: 'Nome da refeição',
    itemsRequired: 'Adicione pelo menos um alimento para salvar a refeição.'
  },
  recipes: {
    title: 'Receitas',
    suggest: 'Sugerir receita',
    openHint: 'Abre a receita',
    loading: 'Carregando receitas',
    errorTitle: 'Não conseguimos carregar suas receitas',
    emptyTitle: 'Nenhuma receita salva',
    emptyMessage:
      'Conte o que você tem em casa e a IA sugere uma receita que cabe nas suas metas de hoje.',
    recipe: 'Receita',
    delete: 'Excluir receita',
    deleteTitle: 'Excluir receita?',
    deleteDescription: 'A receita será apagada. Essa ação não pode ser desfeita.',
    logAsMeal: 'Registrar como refeição',
    logDescription:
      'A receita entra como uma porção, com os macros dela. Dá para ajustar a quantidade depois, editando a refeição.',
    logMeal: 'Registrar refeição',
    loggedTitle: 'Refeição registrada',
    loggedMessage: 'A receita já aparece no dia escolhido.',
    buildingWithAi: 'Estamos montando sua receita com ajuda da inteligência artificial',
    suggested: 'Receita sugerida',
    suggestAnotherError: 'Não foi possível sugerir outra receita',
    saveError: 'Não foi possível salvar a receita',
    whatDoYouHave: 'O que você tem em casa?',
    ingredientsPlaceholder: 'Ex.: meio queijo mussarela, 5 ovos, 1 tomate e um pouco de presunto',
    suggestHint:
      'A receita considera o seu objetivo e o que ainda falta das suas metas de hoje. Se quiser, diga o tamanho, como “cerca de 400 kcal”.',
    suggestAnother: 'Sugerir outra',
    save: 'Salvar receita'
  },
  savedMeals: {
    title: 'Refeições salvas',
    tapToLog: 'Toque em uma refeição para cadastrá-la.',
    logError: 'Não foi possível cadastrar a refeição',
    delete: 'Excluir refeição salva',
    logHint: 'Cadastra esta refeição',
    logging: 'Cadastrando',
    deleteTitle: 'Excluir refeição salva?',
    deleteDescription:
      'Ela sai da sua lista de refeições salvas. As refeições já cadastradas continuam no diário.',
    loading: 'Carregando refeições salvas',
    errorTitle: 'Não conseguimos carregar suas refeições salvas',
    emptyTitle: 'Nenhuma refeição salva',
    emptyMessage:
      'Abra uma refeição já analisada e toque em salvar. Ela aparece aqui para você cadastrar de novo com um toque.'
  },
  goals: {
    title: 'Suas Metas',
    byCaloriesHint:
      'Proteínas e gorduras continuam como estão; os carboidratos são ajustados para completar as calorias.',
    byMacrosHint: 'As calorias passam a ser a soma dos macros.',
    byCalories: 'Por calorias',
    byMacros: 'Por macros',
    modeLabel: 'Como definir as metas'
  }
};
