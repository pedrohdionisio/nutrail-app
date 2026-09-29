import type { ptBR } from './ptBR';

export const enUS: typeof ptBR = {
  common: {
    back: 'Back',
    cancel: 'Cancel',
    delete: 'Delete',
    save: 'Save',
    confirm: 'Confirm',
    dateInputPlaceholder: 'MM/DD/YYYY',
    retry: 'Try again',
    loading: 'Loading',
    continue: 'Continue',
    email: 'E-mail',
    password: 'Password',
    calories: 'Calories',
    protein: 'Protein',
    carbohydrate: 'Carbohydrates',
    fat: 'Fat',
    carbohydrateShort: 'Carbs',
    aiLoadingHint: 'This may take a few seconds.',
    totalMacros: 'Total macros',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    mealTime: 'Time · {{time}}',
    mealTimeLabel: 'Meal time: {{time}}',
    mealTimeHint: 'Changes the meal time',
    deleteMealTitle: 'Delete meal?',
    deleteMealDescription: 'The meal and its picture will be deleted. This cannot be undone.',
    signOut: 'Sign out',
    connectionHint: 'Check your connection and try again.',
    invalidTimeTitle: 'Invalid time',
    futureTimeMessage: 'The meal time cannot be in the future.',
    close: 'Close',
    tryAgainSoon: 'Try again in a moment.',
    mealTimeTitle: 'Meal time',
    openSettings: 'Open settings',
    date: 'Date',
    time: 'Time',
    mealPicture: 'Meal picture',
    addPicture: 'Add picture',
    meal: 'Meal',
    name: 'Name',
    photosError: 'Could not open your photos',
    uploadPictureError: 'Could not upload the picture',
    retryFailed: 'Could not try again',
    analyzingWithAi: 'We are calculating your macros with the help of artificial intelligence',
    analysisSlowTitle: 'The analysis is taking a while',
    analysisSlowMessage: 'Your meal will show up on the list as soon as it is ready.',
    editMeal: 'Edit meal',
    saveMeal: 'Save meal'
  },
  language: {
    title: 'Language',
    'pt-BR': 'Português',
    'en-US': 'English'
  },
  options: {
    goal: {
      LOSE: 'Lose weight',
      MAINTAIN: 'Maintain weight',
      GAIN: 'Gain weight'
    },
    gender: {
      MALE: 'Male',
      FEMALE: 'Female'
    },
    activityLevel: {
      SEDENTARY: 'Sedentary',
      LIGHT: 'Light',
      MODERATE: 'Moderate',
      HEAVY: 'Heavy',
      ATHLETE: 'Athlete'
    },
    activityLevelDescription: {
      SEDENTARY: 'I do not exercise',
      LIGHT: '1 to 2 times a week',
      MODERATE: '3 to 5 times a week',
      HEAVY: '6 to 7 times a week',
      ATHLETE: 'More than 7 times a week'
    }
  },
  validation: {
    nameRequired: 'Enter your name',
    nameTooLong: 'The name is too long',
    invalidDate: 'Enter a valid date',
    futureDate: 'The date cannot be in the future',
    heightInCentimeters: 'Enter your height in centimeters',
    weightInKilograms: 'Enter your weight in kilograms',
    genderRequired: 'Choose a gender',
    goalRequired: 'Choose a goal',
    activityLevelRequired: 'Choose an activity level',
    currentPasswordRequired: 'Enter your current password',
    passwordTooShort: 'The password must have at least 8 characters',
    passwordTooLong: 'The password must have at most 256 characters',
    passwordsMismatch: 'The passwords do not match',
    emailInvalid: 'Invalid e-mail format',
    emailTooLong: 'The e-mail is too long',
    passwordRequired: 'Enter your password',
    codeRequired: 'Enter the code sent to your e-mail',
    descriptionMax1000: 'The description can have at most 1000 characters',
    descriptionMax500: 'The description can have at most 500 characters',
    caloriesPositive: 'The calorie goal must be greater than zero',
    quantityPositive: 'The quantity must be greater than zero',
    itemsMax: 'A meal can have at most 50 items',
    ingredientsRequired: 'Tell us what you have at home',
    foodToAddRequired: 'Describe the food you want to add',
    mealDescriptionRequired: 'Describe what you ate',
    savedMealNameRequired: 'Give the meal a name',
    mealNameRequired: 'Enter the meal name',
    invalidTime: 'Enter a valid time',
    wholeNumber: 'Enter a whole number',
    invalidQuantity: 'Enter a valid quantity',
    itemsRequired: 'Keep at least one item in the meal',
    futureTime: 'The time cannot be in the future',
    nameMax120: 'The name can have at most 120 characters',
    nameMax60: 'The name can have at most 60 characters'
  },
  errors: {
    network: 'Could not reach the server. Check your connection.',
    fallback: 'Could not complete the action. Try again.',
    VALIDATION: 'Check the information and try again.',
    UNAUTHORIZED: 'Your session expired. Sign in again.',
    INVALID_REFRESH_TOKEN: 'Your session expired. Sign in again.',
    INVALID_CREDENTIALS: 'Incorrect e-mail or password.',
    INVALID_CURRENT_PASSWORD: 'The current password is incorrect.',
    EMAIL_ALREADY_IN_USE: 'This e-mail is already in use.',
    INVALID_CODE: 'Invalid or expired code.',
    TOO_MANY_ATTEMPTS: 'Too many attempts. Wait a moment and try again.',
    USER_NOT_FOUND: 'User not found.',
    MEAL_NOT_FOUND: 'Meal not found.',
    MEAL_NOT_EDITABLE: 'Only meals that were already analyzed can be edited.',
    MEAL_NOT_SAVABLE: 'Only meals that were already analyzed can be saved.',
    MEAL_WITHOUT_ITEMS: 'No food was identified in the meal.',
    MEAL_ANALYSIS_FAILED: 'We could not analyze the meal. Try again.',
    MEAL_PICTURE_NOT_ALLOWED: 'The picture of this meal cannot be changed now.',
    INVALID_MEAL_TRANSITION: 'This meal cannot be changed now.',
    NO_FOOD_INGREDIENTS: 'We could not find any food in the description.',
    GOALS_BELOW_MACROS: 'The calories do not cover your protein and fat goals.',
    RECIPE_NOT_FOUND: 'Recipe not found.',
    SAVED_MEAL_NOT_FOUND: 'Saved meal not found.',
    RECIPE_GENERATION_FAILED: 'We could not generate a recipe. Try again.'
  },
  profile: {
    title: 'Profile',
    signOut: 'Sign out',
    name: 'Name',
    birthDate: 'Date of birth',
    height: 'Height',
    weight: 'Weight',
    gender: 'Sex',
    goal: 'Goal',
    activityLevel: 'Activity level',
    goalsRecalculated:
      'When you save, your calorie and macro goals are recalculated from this information.',
    changePassword: 'Change password',
    deleteAccount: 'Delete account',
    currentPassword: 'Current password',
    newPassword: 'New password',
    newPasswordConfirmation: 'Confirm the new password',
    saveNewPassword: 'Save new password',
    passwordChangedTitle: 'Password changed',
    passwordChangedMessage: 'Use the new password the next time you sign in.',
    deleteAccountTitle: 'Delete account?',
    deleteAccountDescription:
      'Your profile, meals, pictures and recipes will be deleted forever. This cannot be undone.',
    goalsRecalculatedShort: 'When you save, your daily goals are recalculated.'
  },
  welcome: {
    title: 'Track your diet the simple way',
    createAccount: 'Create account',
    haveAccount: 'Already have an account?',
    signInAction: 'Sign in',
    forgotPassword: 'Forgot your password?',
    recoverPasswordAction: 'Recover password',
    signInTitle: 'Sign in to your account',
    signIn: 'Sign in',
    forgotPasswordTitle: 'Recover your password',
    forgotPasswordDescription:
      'Enter the e-mail of your account and we will send you a code to create a new password.',
    sendCode: 'Send code',
    resetPasswordTitle: 'Create a new password',
    code: 'Code',
    resendCode: 'Resend code',
    resetPasswordDescription: 'We sent a code to {{email}}. Check your spam folder too.',
    passwordResetTitle: 'Password changed',
    passwordResetMessage: 'Sign in with your new password.',
    codeResentTitle: 'Code resent',
    codeResentMessage: 'We sent a new code to {{email}}.'
  },
  onboarding: {
    steps: {
      goal: {
        title: 'What is your goal?',
        description: 'What do you want to achieve with your diet?'
      },
      gender: {
        title: 'What is your biological sex?',
        description: 'Your sex influences the kind of diet'
      },
      birthDate: {
        title: 'When were you born?',
        description: 'Each age group responds in its own way'
      },
      height: {
        title: 'How tall are you?',
        description: 'An estimate is fine'
      },
      weight: {
        title: 'How much do you weigh?',
        description: 'An estimate is fine'
      },
      activityLevel: {
        title: 'What is your activity level?'
      },
      account: {
        title: 'Create your account',
        description: 'So you can follow your progress'
      }
    },
    createAccount: 'Create account',
    heightLabel: 'Height (cm)',
    weightLabel: 'Weight (kg)',
    name: 'Name',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@email.com',
    passwordPlaceholder: 'At least 8 characters',
    passwordConfirmation: 'Confirm password',
    birthDate: 'Date of birth',
    planErrorTitle: 'We could not build your plan',
    planErrorMessage: 'Your account was created. Check your connection and try again.',
    personalizing: 'We are personalizing the app for you',
    planTitlePrefix: 'Your diet plan to',
    planTitleSuffix: 'is ready!',
    planDescription:
      'This is the recommended daily goal for your plan. Do not worry, you can edit it later if you want.',
    startPlan: 'Start my plan',
    goalSummary: {
      LOSE: 'Lose Weight',
      MAINTAIN: 'Maintain Weight',
      GAIN: 'Gain Weight'
    }
  },
  appError: {
    message:
      'The app hit an unexpected error. Try again; if it keeps happening, close and reopen the app.',
    title: 'Something went wrong'
  },
  home: {
    chooseDay: 'Choose day',
    retryFailed: 'Could not try again',
    today: 'Today',
    yesterday: 'Yesterday',
    dayLabel: '{{day}}, {{month}} {{date}}',
    loadingMeals: 'Loading meals',
    mealsErrorTitle: 'We could not load your meals',
    emptyMeals: 'No meals logged on this day. Log one with an option below:',
    newMealTitle: 'Log your meal',
    savedMealLabel: 'Saved meal',
    savedMealAccessibility: 'Log a saved meal',
    manualMealLabel: 'Typed meal',
    manualMealAccessibility: 'Log a meal by typing',
    audioLabel: 'Voice',
    audioAccessibility: 'Log a meal by voice',
    pictureLabel: 'Picture',
    pictureAccessibility: 'Log a meal by picture',
    addMeal: 'Log meal',
    previousDay: 'Previous day',
    nextDay: 'Next day',
    chooseDayHint: 'Opens the calendar to choose the day',
    chooseDayLabel: 'Choose day: {{label}}',
    dataErrorTitle: 'We could not load your data',
    profile: 'Profile',
    recipes: 'Recipes',
    goals: 'Goals',
    deleteMeal: 'Delete meal',
    openMealHint: 'Opens the meal details',
    analyzing: 'Analyzing',
    analyzingMessage:
      'We are calculating the macros. The meal joins the day summary as soon as it is ready.',
    failedMessage: 'We could not analyze this meal. Try again or delete it by swiping sideways.',
    caloriesLeft: '{{count}} kcal left',
    caloriesOver: '{{count}} kcal over the goal',
    fallbackTitle: {
      ANALYZED: 'Meal',
      ANALYZING: 'Analyzing meal',
      FAILED: 'Meal not analyzed'
    },
    weekdays: {
      '0': 'Sunday',
      '1': 'Monday',
      '2': 'Tuesday',
      '3': 'Wednesday',
      '4': 'Thursday',
      '5': 'Friday',
      '6': 'Saturday'
    },
    months: {
      '0': 'January',
      '1': 'February',
      '2': 'March',
      '3': 'April',
      '4': 'May',
      '5': 'June',
      '6': 'July',
      '7': 'August',
      '8': 'September',
      '9': 'October',
      '10': 'November',
      '11': 'December'
    },
    mealsTitle: 'Meals',
    greeting: 'Hi,'
  },
  pictureMeal: {
    confirm: 'Confirm picture',
    discard: 'Discard picture',
    captureError: 'Could not take the picture',
    analysisFailedTitle: 'We could not analyze the picture',
    analysisFailedMessage: 'Try again or use another picture with the food clearly visible.',
    openingCamera: 'Opening the camera',
    cameraPermission:
      'Allow camera access to take a picture of your meal, or pick one from the gallery.',
    allowCamera: 'Allow camera',
    take: 'Take picture',
    takeLabel: 'Take Picture',
    chooseFromGallery: 'Choose a picture from the gallery',
    gallery: 'Gallery'
  },
  audioMeal: {
    confirm: 'Confirm recording',
    discard: 'Discard recording',
    recordError: 'Could not record the audio',
    saveError: 'Could not save the audio',
    recordAgain: 'Try recording again.',
    uploadError: 'Could not upload the audio',
    analysisFailedTitle: 'We could not understand the audio',
    analysisFailedMessage: 'Try again or record once more, saying the foods and the amounts.',
    stopRecording: 'Stop recording',
    stop: 'Stop',
    record: 'Record audio',
    recordLabel: 'Record',
    preparingMicrophone: 'Preparing the microphone',
    microphonePermission: 'Allow microphone access to record the description of your meal.',
    allowMicrophone: 'Allow microphone',
    pause: 'Pause audio',
    play: 'Play audio',
    hints: {
      IDLE: 'Tap record and tell us what you ate, with the amounts. For example: “two scrambled eggs and a slice of whole wheat bread”.',
      RECORDING: 'Recording. Tap stop when you are done.',
      RECORDED: 'Listen to the audio if you want, and confirm to calculate the macros.'
    }
  },
  manualMeal: {
    title: 'Typed meal',
    pictureFailedTitle: 'Meal logged without the picture',
    pictureFailedMessage: 'The macros were calculated, but we could not upload the picture.',
    whatDidYouEat: 'What did you eat?',
    descriptionPlaceholder:
      'E.g.: 2 scrambled eggs, 1 bread roll with butter and a coffee with milk',
    optionalPicture: 'Picture (optional)',
    removePicture: 'Remove picture',
    calculate: 'Calculate macros'
  },
  mealDetails: {
    sendingPicture: 'Uploading picture',
    changePicture: 'Change picture',
    items: 'Items',
    itemMacros: '{{protein}}g prot · {{carbohydrate}}g carb · {{fat}}g fat',
    saveDescription: 'The items and macros are kept so you can log this meal again with one tap.',
    savePlaceholder: 'E.g.: My usual breakfast',
    savedTitle: 'Meal saved',
    savedMessage: 'Log it again whenever you want, from "Saved meal".',
    loading: 'Loading meal'
  },
  editMeal: {
    removeItem: 'Remove {{name}}',
    addFood: 'Add food',
    addFoodPlaceholder: 'E.g.: 2 tablespoons of olive oil',
    add: 'Add',
    mealName: 'Meal name',
    itemsRequired: 'Add at least one food to save the meal.'
  },
  recipes: {
    title: 'Recipes',
    suggest: 'Suggest recipe',
    openHint: 'Opens the recipe',
    loading: 'Loading recipes',
    errorTitle: 'We could not load your recipes',
    emptyTitle: 'No saved recipes',
    emptyMessage:
      'Tell us what you have at home and the AI suggests a recipe that fits your goals for today.',
    recipe: 'Recipe',
    delete: 'Delete recipe',
    deleteTitle: 'Delete recipe?',
    deleteDescription: 'The recipe will be deleted. This cannot be undone.',
    logAsMeal: 'Log as a meal',
    logDescription:
      'The recipe is logged as one serving, with its macros. You can adjust the amount later by editing the meal.',
    logMeal: 'Log meal',
    loggedTitle: 'Meal logged',
    loggedMessage: 'The recipe now shows on the chosen day.',
    buildingWithAi: 'We are building your recipe with the help of artificial intelligence',
    suggested: 'Suggested recipe',
    suggestAnotherError: 'Could not suggest another recipe',
    saveError: 'Could not save the recipe',
    whatDoYouHave: 'What do you have at home?',
    ingredientsPlaceholder: 'E.g.: half a mozzarella cheese, 5 eggs, 1 tomato and some ham',
    suggestHint:
      'The recipe considers your goal and what is left of your goals for today. If you want, say the size, like “about 400 kcal”.',
    suggestAnother: 'Suggest another',
    save: 'Save recipe'
  },
  savedMeals: {
    title: 'Saved meals',
    tapToLog: 'Tap a meal to log it.',
    logError: 'Could not log the meal',
    delete: 'Delete saved meal',
    logHint: 'Logs this meal',
    logging: 'Logging',
    deleteTitle: 'Delete saved meal?',
    deleteDescription:
      'It leaves your list of saved meals. Meals already logged stay in your diary.',
    loading: 'Loading saved meals',
    errorTitle: 'We could not load your saved meals',
    emptyTitle: 'No saved meals',
    emptyMessage:
      'Open an analyzed meal and tap save. It shows up here so you can log it again with one tap.'
  },
  goals: {
    title: 'Your Goals',
    byCaloriesHint:
      'Protein and fat stay as they are; carbohydrates are adjusted to complete the calories.',
    byMacrosHint: 'Calories become the sum of the macros.',
    byCalories: 'By calories',
    byMacros: 'By macros',
    modeLabel: 'How to set the goals'
  }
};
