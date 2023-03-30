
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css" //依赖的cesium库本身css
import "mars3d/dist/mars3d.css";
import "@/cesium/cesium.css"
import * as mars3d from "mars3d";

var viewer
var map
var graphicLayer
var id = 'mars3dContainer'

export default class {
    // 初始化地球
    initMap() {
        viewer = new Cesium.Viewer(id, {
            sceneMode: Cesium.SceneMode.SCENE3D,
            animation: false,
            timeline: false,
            homeButton: false, // 默认相机位置控件
            geocoder: false, // 地理位置查询定位控件
            baseLayerPicker: false, // 是否显示图层选择控件
            fullscreenButton: false, // 全屏控件
            sceneModePicker: false, //是否显示3D/2D选择器
            navigationHelpButton: false, // 默认的相机控制提示控件
            imageryProvider: new Cesium.TileMapServiceImageryProvider({
                url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
            })
        })
        viewer.infoBox.frame.sandbox = "";
        viewer.selectionIndicator.viewModel.selectionIndicatorElement.style.display = 'none';
        viewer.infoBox.frame.contentWindow.document.body.innerHTML = "";
        viewer.infoBox.container.style.display = "none";
        console.log(viewer);
        map = new mars3d.Map(viewer, {
            scene: {
                center: { lat: 30.054604, lng: 108.885436, alt: 17036414, heading: 0, pitch: -90 },
                shadows: true, //是否启用日照阴影
                showSun: true, //是否显示太阳
                showMoon: true, //是否显示月亮
                showSkyBox: true, //是否显示天空盒

                fog: true, //是否启用雾化效果
                fxaa: true, //是否启用抗锯齿
                sceneMode: 3, //3等价于Cesium.SceneMode.SCENE3D,
                globe: {
                    depthTestAgainstTerrain: false, //是否启用深度监测
                    baseColor: '#546a53', //地球默认背景色
                    showGroundAtmosphere: true, //是否在地球上绘制的地面大气
                    enableLighting: false //是否显示昼夜区域
                },
            },

            control: {
                contextmenu: { hasDefault: true }, // 右键菜单
            },
        })
        graphicLayer = new mars3d.layer.GraphicLayer()
        map.addLayer(graphicLayer)



    }
}
// 飞固定点 
export function fly(cameraView, options) {
    /**  
     * @param { cameraView }  // object  经纬度方位角
     * @param { options }  // object   飞行时间
    **/
    map.setCameraView(cameraView, options)
}

// 飞行漫游
export function flyRoaming(arr, options) {
    map.setCameraViewList(arr, options)
}

//设置默认亮度 
export function setDefaultBrightness(brightness) {

    /**
      * @param { brightness }  // Number
     **/


    const stages = viewer.scene.postProcessStages;
    viewer.scene.brightness = viewer.scene.brightness || stages.add(Cesium.PostProcessStageLibrary.createBrightnessStage());
    viewer.scene.brightness.enabled = true;
    viewer.scene.brightness.uniforms.brightness = Number(brightness);
}
// 添加模型
const graphic = new mars3d.graphic.ModelEntity({
    name: "警车",
    position: [116.391245, 39.908757, 1],
    style: {
        url: "//data.mars3d.cn/gltf/mars/jingche/jingche.gltf",
        scale: 10, //比例
        minimumPixelSize: 50,
        heading: 180, //方向角
        // pitch: 0, //俯仰角
        // roll: 0, //翻滚角
        opacity: 1, //透明的
    },

})
export function addDemoGraphic1(car) {

    car == true ? graphicLayer.addGraphic(graphic) : graphicLayer.removeGraphic(graphic)
}
// 加载建筑模型模型
const tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "石化工厂",
    url: "http://data.mars3d.cn/3dtiles/max-shihua/tileset.json",
    position: { lng: 116.390098, lat: 39.917757, alt: 24.6 },
    rotation: { x: 0, y: 0, z: 40 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    popup: "all"
})
export function buildingModel(addHouse) {
    addHouse == true ? map.addLayer(tiles3dLayer) : map.removeLayer(tiles3dLayer)
}
//直接创建具体类型的图层对象
const tileLayer = new mars3d.layer.XyzLayer({
    url: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
    // url: ' http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'

})
export function addImages(a) {
    a == true ? map.addLayer(tileLayer) : map.removeLayer(tileLayer)
}
// 下雨
const rainEffect = new mars3d.effect.RainEffect({
    size: 100,    // number		可选粒子大小
    speed: 10,   // number	 	可选速度
    direction: 0,//number	可选方向（度），0度垂直向下
})
export function addRainEffect(rain) {
    rain == true ? map.addEffect(rainEffect) : map.removeEffect(rainEffect)
}
//切换二维三维
export function morphTo(type) {
    switch (type) {
        //二维
        case 2:
            viewer.scene.morphTo2D(0)
            break;

        //三维
        case 3:
            viewer.scene.morphTo3D(0)
            break

        //哥伦布视图
        default:
            viewer.scene.morphToColumbusView(0)
    }
}


// 添加鹰眼图
const overviewMap = new mars3d.control.OverviewMap({
    basemap: {
        name: "天地图电子",
        type: "group",
        layers: [
            { name: "底图", type: "tdt", layer: "vec_d" },
            { name: "注记", type: "tdt", layer: "vec_z" }
        ]
    },
    rectangle: {
        color: "#fecd78",
        opacity: 0,
        outline: 0,
        outlineColor: "#ff7800"
    },
    style: {
        right: "5px",
        bottom: "5px",
        width: "250px",
        height: "150px"
    },

})
export function hawkeyeAPI(hawkeye) {
    if (hawkeye == true) {
        map.addControl(overviewMap)

        overviewMap.smallMap.setOptions({
            scene: {
                center: { lng: 116.391245, lat: 39.905757, alt: 697.3, heading: 357.3, pitch: -26.2, roll: 0 },
                sceneMode: Cesium.SceneMode.SCENE3D
            }
        })
        // overviewMap.smallMap.addLayer(tileLayer)
    } else {
        map.removeControl(overviewMap)
    }

}

//添加点
const punctuations = new mars3d.graphic.PointEntity({
    position: [116.2, 31.0, 1000],
    style: {
        color: "#ff0000",
        pixelSize: 20,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2
    },
    attr: { remark: "示例2" }
})
// const Signs = new mars3d.graphic.DivGraphic({
//     position: [116.2, 31.0, 1000],
//     style: {
//         html: `<div class='marsGreenGradientPnl' ><img src="@/assets/icon/off.png" alt=""></div>`,
//         // horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//         // verticalOrigin: Cesium.VerticalOrigin.BOTTOM,

//         // 高亮时的样式
//         // highlight: {
//         //     type: mars3d.EventType.click,
//         //     className: "marsGreenGradientPnl-highlight"
//         // }
//     },
// })

export function punctuationsAPI(punctuation) {
    // punctuation == true ? graphicLayer.addGraphic(Signs) : graphicLayer.removeGraphic(Signs)
    punctuation == true ? graphicLayer.addGraphic(punctuations) : graphicLayer.removeGraphic(punctuations)
    bindLayerPopup("小明") // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效
}

function bindLayerPopup(a) {
    const content = `<div></div>`
    // const options = null
    const options = {

        template: `<div  class='popup'>
                      <img class='icon hover' id='myButton' src="src/assets/icon/off.png" alt="关闭">
                      <div>弹窗支持自定义样式</div>
                      <div>动态传值：${a}</div>
                      <div id='tdTime' class='time'></div>
                   </div>`,

    }

    punctuations.on(mars3d.EventType.popupOpen, function (event) {
        const container = event.container // popup对应的DOM
        const myButton = container.querySelector("#myButton")
        if (myButton) {
            myButton.addEventListener("click", () => {
                console.log('点击了');
            })
        }
    })

    punctuations.on(mars3d.EventType.postRender, function (event) {
        const container = event.container // popup对应的DOM
        const tdTime = container.querySelector("#tdTime")
        if (tdTime) {
            const date = mars3d.Util.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss S")

            tdTime.innerHTML = date
        }
    })




    graphicLayer.bindPopup(content, options)


}



export function terrainAPI(terrain) {


    if (terrain == true) {
        map.terrainProvider = mars3d.LayerUtil.createTerrainProvider({
            url: "http://data.mars3d.cn/terrain"
        })
    } else {
        map.terrainProvider = mars3d.LayerUtil.getNoTerrainProvider()
    }


}






















export { map, id }
