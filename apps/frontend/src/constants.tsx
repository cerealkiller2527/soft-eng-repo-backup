
type OverlayImage = {
    imageUrl: string;
    bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
    };
};
export const overlays: OverlayImage[][] = [
    //Floor 1
    [
        {
            imageUrl: "/chestnutFloorOne.png",
            bounds: {
                north: 42.32624046941922,
                south: 42.32567461058454,
                east: -71.14920891056955,
                west: -71.15014579333681,
            },
        },
        {
            imageUrl: "/20PatriotPlaceFloorOne.png",
            bounds: {
                north: 42.09309,
                south: 42.09249,
                east: -71.26552,
                west: -71.26656,
            },
        },
        {
            imageUrl: "/falknerFloorOne.png",
            bounds: {
                north: 42.30250258195755,
                south: 42.300903146614,
                east: -71.12764275196665,
                west: -71.12937875693645,
            },


        },
        {
            imageUrl: "/belkin.png",
            bounds: {
                north: 42.30198,
                south: 42.30155,
                east: -71.12682,
                west: -71.12728,
            },


        },
        {
            imageUrl: "/22PatriotPlaceFloorOne.png",
            bounds: {
                north: 42.09310,
                south: 42.09224,
                east: -71.26652,
                west: -71.26756,
            },
        },

    ],
    //Floor 2
    [
        {
            imageUrl: "/22PatriotPlaceFloorThree.png",
            bounds: {
                north: 42.09310,
                south: 42.09224,
                east: -71.26652,
                west: -71.26634,
            },
        },
        // 42.33694209846247, -71.10742130229114
        // 42.33320397707655, -71.10606521452486
        {
            imageUrl: "/BWMainCampus.png",
            bounds: {
                north: 42.33795,
                south: 42.33300,
                east: -71.10340,
                west: -71.11050,
            }
        }

    ],
    //floor 3
    [
        {
            imageUrl: "/22PatriotPlaceFloorThree.png",
            bounds: {
                north: 42.09310,
                south: 42.09224,
                east: -71.26634,
                west: -71.26756,
            },
        },

    ],
    //Floor 4
    [
        {
            imageUrl: "/22PatriotPlaceFloorFour.png",
            bounds: {
                north: 42.09310,
                south: 42.09224,
                east: -71.26652,
                west: -71.26756,
            },
        },
    ],
];