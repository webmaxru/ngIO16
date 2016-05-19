/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material'
};

/** User packages configuration. */
const packages: any = {
  '@angular2-material/core': {
    defaultExtension: 'js',
    main: 'core.js'
  },
  '@angular2-material/toolbar': {
    defaultExtension: 'js',
    main: 'toolbar.js'
  },
  '@angular2-material/progress-circle': {
    defaultExtension: 'js',
    main: 'progress-circle.js'
  },
  '@angular2-material/list': {
    defaultExtension: 'js',
    main: 'list.js'
  },
  '@angular2-material/input': {
    defaultExtension: 'js',
    main: 'input.js'
  },
  '@angular2-material/button': {
    defaultExtension: 'js',
    main: 'button.js'
  },
  '@angular2-material/card': {
    defaultExtension: 'js',
    main: 'card.js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/app-shell',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

cliSystemConfigPackages['app'] = {
  main: 'index',
  defaultExtension: 'js'
};

cliSystemConfigPackages['angularfire2'] = {
  defaultExtension: 'js',
  main: 'angularfire2.js'
};

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js',
    firebase: 'vendor/firebase/lib/firebase-web.js',
    angularfire2: 'vendor/angularfire2'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
