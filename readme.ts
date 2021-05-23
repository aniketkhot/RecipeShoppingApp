// the feature(custom) module we are creating seperately in our app, if we are using directive, component, pipes from angular provided feature then those partcular modules needs to be imported in that feature module explicitely. exception is services	

// BrowserModule must be used only once in the appModule as other than adding just feature it also does some application start up work

// in all other modulea of your app use CommonModule from  common to get access of browser module features(ngIf etc). this is exceptional case

// if a component is used in its own module and nowhere eelse then we dont need to export it. even for router module of that particular module as in while mentioning the routes we specically tell angular that which component to be loaded for that module

// if we have some modules sharing same componennts or directives or modules then we can make a shared module and add these shared items in that shared module
// and then we import this shared module in the required modules

// the shared module that we create has to export the items which are required or used by the modules in which we are importing the shareed module

// components, pipes, directives must be declred only in the whole app. so if we want to use a specific component in the other component then we must have export it from that component and import the module in other component then use that components








