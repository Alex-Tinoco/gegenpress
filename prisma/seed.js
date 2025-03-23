const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.places.createMany({
    data: [
      {
        name: "Le Five Villette",
        location: "48.90708475329878, 2.386106839607033",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Villette.jpg",
      },
      {
        name: "Le Five Paris-13",
        location: "48.81826753739691, 2.365847310767609",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Paris-13.jpg",
      },
      {
        name: "Le Five Paris-17",
        location: "48.90013071137618, 2.3212805242650827",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Paris-17.jpg",
      },
      {
        name: "Le Five Paris-18",
        location: "48.897922703033004, 2.370077041454442",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Paris-18.jpg",
      },
      {
        name: "Le Five Lyon",
        location: "45.767392660131556, 4.9802324971405",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Lyon.jpg",
      },
      {
        name: "Le Five Dunkerque",
        location: "51.01418697724068, 2.3481507594757827",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Dunkerque.jpg",
      },
      {
        name: "Le Five Nancy",
        location: "48.645285238146606, 6.1893786101274895",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Nancy.jpg",
      },
      {
        name: "Le Five Rouen",
        location: "49.42774650245889, 1.1038891840869893",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Rouen.jpg",
      },
      {
        name: "Le Five Bordeaux",
        location: "44.879961826605886, -0.55944100267449",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Bordeaux.jpg",
      },
      {
        name: "Le Five Créteil",
        location: "48.76446415504623, 2.4706629261068334",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Créteil.jpg",
      },
      {
        name: "Le Five Bezons",
        location: "48.91918514864233, 2.2118370819367352",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Bezons.jpg",
      },
      {
        name: "Le Five Limoges",
        location: "45.87083018464028, 1.2626885008405817",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Limoges.jpg",
      },
      {
        name: "Le Five Mulhouse",
        location: "47.79615300301785, 7.305066283734575",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Mulhouse.jpg",
      },
      {
        name: "Le Five Metz",
        location: "49.08617949649642, 6.118449368450501",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Metz.jpg",
      },
      {
        name: "Le Five Orléans",
        location: "47.9417550488857, 1.935828326070152",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "LEFIVE_Orléans.jpg",
      },
      {
        name: "UrbanSoccer Villeneuve-Loubet",
        location: "43.661430904535564, 7.095260596967504",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Villeneuve-Loubet.jpg",
      },
      {
        name: "UrbanSoccer Montpellier",
        location: "43.62892006477087, 3.9096826059124563",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Montpellier.jpg",
      },
      {
        name: "UrbanSoccer Toulouse",
        location: "43.574757606456636, 1.4801339598847076",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Toulouse.jpg",
      },
      {
        name: "UrbanSoccer Bordeaux",
        location: "44.77899470754144, -0.6444370474424466",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Bordeaux.jpg",
      },
      {
        name: "UrbanSoccer Nantes",
        location: "47.19040007168698, -1.4845309282724095",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Nantes.jpg",
      },
      {
        name: "UrbanSoccer Rennes",
        location: "48.200206966559634, -1.7233421454047726",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Rennes.jpg",
      },
      {
        name: "UrbanSoccer Lille",
        location: "50.61636437365704, 3.099918085418862",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Lille.jpg",
      },
      {
        name: "UrbanSoccer Strasbourg",
        location: "48.59363507138069, 7.7318338564655935",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Strasbourg.jpg",
      },
      {
        name: "UrbanSoccer Lyon",
        location: "45.71212602405916, 4.9039498544561",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Lyon.jpg",
      },
      {
        name: "UrbanSoccer Ivry-Sur-Seine",
        location: "48.8201024014382, 2.3936432834661816",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Ivry-Sur-Seine.jpg",
      },
      {
        name: "UrbanSoccer Puteaux",
        location: "48.88474721555195, 2.2314756302583074",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Puteaux.jpg",
      },
      {
        name: "UrbanSoccer Nanterre",
        location: "48.89969141530404, 2.221666568129117",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Nanterre.jpg",
      },
      {
        name: "UrbanSoccer Asnières",
        location: "48.92203714275551, 2.3068271258012065",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Asnières.jpg",
      },
      {
        name: "UrbanSoccer Meudon",
        location: "48.80025110980536, 2.214077096958777",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Meudon.jpg",
      },
      {
        name: "UrbanSoccer Lognes",
        location: "48.82664600870076, 2.629564950935421",
        hours_open: "Mon-Fri: 10:00 - 00:00; Sat-Sun: 09:00 - 22:00",
        image: "URBANSOCCER_Lognes.jpg",
      },
    ],
  });
}

main();
