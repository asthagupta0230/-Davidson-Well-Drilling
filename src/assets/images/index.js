import representativeVintageRig from '../../../image/hero1.jpg'
import representativeHistoricRig from '../../../image/hero2.jpg'
import representativeTruckRig from "../../../image/hero33.jpg";
import representativeBorehole from "../../../image/Drilling.jpg";
import representativeDrillingCrew from '../../../image/download (2).jpg'
import representativeDriller from '../../../image/download (3).jpg'
import representativeRockDrilling from '../../../image/Drilling.jpg'
import representativeExplorationDrilling from '../../../image/global-drilling-exploration.jpg'
import representativeAugerRig from '../../../image/down-hole-installation.jpg'
import representativeWaterWell from '../../../image/water-well-drilling.jpg'
import representativeHydrofracturing from '../../../image/hydrofracturing.jpg'
import representativeGeothermalLoops from '../../../image/geothermal-loops.jpg'
import representativeVerticalDrilling from '../../../image/vertical-drilling.jpg'

export const photos = {
  hero: representativeVintageRig,
  field: representativeTruckRig,
  borehole: representativeBorehole,
  crew: representativeDrillingCrew,
  driller: representativeDriller,
  rockDrilling: representativeRockDrilling,
  explorationDrilling: representativeExplorationDrilling,
  augerRig: representativeAugerRig,
  servicesHero: representativeHistoricRig,
}

export const servicePhotos = {
  'water-well-drilling': {
    src: representativeWaterWell,
    alt: 'A drilling rig and crew at a well site as water rises from the borehole.',
    caption: 'Representative well drilling • not a verified Davidson project',
    objectPosition: 'center 48%',
  },
  hydrofracturing: {
    src: representativeHydrofracturing,
    alt: 'A worker beside several strong water jets discharging into a large bore.',
    caption: 'Illustrative high-volume water discharge • not a verified Davidson project',
    objectPosition: 'center 50%',
  },
  'geothermal-ground-loop-systems': {
    src: representativeGeothermalLoops,
    alt: 'Ground-source geothermal equipment with vertical piping and steam in an outdoor installation.',
    caption: 'Illustrative geothermal equipment • not a verified Davidson project',
    objectPosition: 'center 48%',
  },
  'vertical-ground-loop-drilling': {
    src: representativeVerticalDrilling,
    alt: 'A tall drilling rig positioned over a vertical borehole at a worksite.',
    caption: 'Representative vertical drilling • third-party rig, not Davidson equipment',
    objectPosition: 'center 44%',
  },
  'down-hole-installation': {
    src: representativeAugerRig,
    alt: 'A vertical drilling rig and down-hole equipment positioned at a borehole.',
    caption: 'Illustrative down-hole drilling equipment • not a verified Davidson project',
    objectPosition: 'center 46%',
  },
}
