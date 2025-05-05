
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
            imageUrl: "/NEWchestnutfloorone.png",
            bounds: {
                north: 42.32624046941922,
                south: 42.32567461058454,
                east: -71.14920891056955,
                west: -71.15014579333681,
            },
        },
        {
            imageUrl: "/1maincampus.png",
            bounds: {
                north: 42.3369129421801,
                south: 42.334922653086586,
                east: -71.10426875447908,
                west: -71.10933782098382,
            }
        },
        {
            imageUrl: "/20patriotplacefloorone.png",
            bounds: {
                north: 42.09309,
                south: 42.09249,
                east: -71.26552,
                west: -71.26656,
            },
        },
        {
            imageUrl: "/falknerfloorone.png",
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
            imageUrl: "/22patriotplacefloorone.png",
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
            imageUrl: "/22patriotplacefloortwo.png",
            bounds: {
                north: 42.09310,
                south: 42.09224,
                east: -71.26652,
                west: -71.26756,
            },
        },
        {
            //42.3369129421801, -71.10933782098382
            //42.334922653086586, -71.10426875447908
            imageUrl: "/maincampus2.png",
            bounds: {
                north: 42.3369129421801,
                south: 42.334922653086586,
                east: -71.10426875447908,
                west: -71.10933782098382,
            }
        },
        {
            imageUrl: "/20PatriotPlaceFloorTwo.png",
            bounds: {
                north: 42.09309,
                south: 42.09249,
                east: -71.26552,
                west: -71.26656,
            },
        }

    ],
    //floor 3
    [
        {
            imageUrl: "/22patriotplacefloorthree.png",
            bounds: {
                north: 42.09310,
                south: 42.09224,
                east: -71.26634,
                west: -71.26756,
            },
        },
        {
            imageUrl: "/20patriotplacefloorthree.png", // 3 the same as 4
            bounds: {
                north: 42.09309,
                south: 42.09249,
                east: -71.26552,
                west: -71.26656,
            },
        },

    ],
    //Floor 4
    [
        {
            imageUrl: "/22patriotplacefloorfour.png",
            bounds: {
                north: 42.09310,
                south: 42.09224,
                east: -71.26652,
                west: -71.26756,
            },
        },
        {
            imageUrl: "/20PatriotPlaceFloorFour.png",
            bounds: {
                north: 42.09309,
                south: 42.09249,
                east: -71.26552,
                west: -71.26656,
            },
        },
    ],
];