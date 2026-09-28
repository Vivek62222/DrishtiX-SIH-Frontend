/* =========================================================
       STATE
    ========================================================== */

    let map;

    let aiLayer;
    let refLayer;
    let humanLayer;
    let buildingLayer;
    let roadLayer;

    let satelliteLayer;
    let streetLayer;

    let activeParcelId = "PX-00124";

    let editMode = false;
    let addingVertex = false;

    let editableMarkers = [];

    let selectedDecision = null;

    let currentDecisionType = null;


    /* =========================================================
       PARCEL DATA
       Demo data structure ready for backend replacement
    ========================================================== */

    const parcelsData = {

        "PX-00124": {

            id: "PX-00124",

            device: "D-102 (Mobile)",

            source: "Drone Survey (ORI)",

            area: 247.32,

            referenceArea: 251.10,

            perimeter: 64.21,

            referencePerimeter: 65.02,

            vertices: [

                [77.5940, 12.9718],

                [77.5945, 12.9718],

                [77.5945, 12.9715],

                [77.5940, 12.9715],

                [77.5940, 12.9718]

            ],

            referenceVertices: [

                [77.5939, 12.9719],

                [77.5946, 12.9719],

                [77.5946, 12.9714],

                [77.5939, 12.9714],

                [77.5939, 12.9719]

            ],

            human: [

                [77.5940, 12.9718],

                [77.5945, 12.9718],

                [77.5945, 12.9714],

                [77.5940, 12.9714],

                [77.5940, 12.9718]

            ],

            buildings: [

                [
                    [77.59410, 12.97172],
                    [77.59432, 12.97172],
                    [77.59432, 12.97157],
                    [77.59410, 12.97157],
                    [77.59410, 12.97172]
                ]

            ],

            roads: [

                [
                    [77.5937, 12.97144],
                    [77.5948, 12.97144]
                ]

            ],

            aiConfidence: 91.2,

            crs: "EPSG:4326 / WGS84",

            captureDate: "19-Sep-2026",

            referenceId: "CAD-8841",

            decision: null,

            decisionReason: "",

            decisionComment: "",

            manualInspection: null,

            history: []

        },


        "PX-00123": {

            id: "PX-00123",

            device: "D-102 (Mobile)",

            source: "Drone Survey (ORI)",

            area: 312.10,

            referenceArea: 313.20,

            perimeter: 70.22,

            referencePerimeter: 70.61,

            vertices: [

                [77.5936, 12.9722],

                [77.5942, 12.9722],

                [77.5942, 12.9718],

                [77.5936, 12.9718],

                [77.5936, 12.9722]

            ],

            referenceVertices: [

                [77.59355, 12.97222],

                [77.59425, 12.97222],

                [77.59425, 12.97178],

                [77.59355, 12.97178],

                [77.59355, 12.97222]

            ],

            human: null,

            buildings: [

                [
                    [77.59372, 12.97212],
                    [77.59404, 12.97212],
                    [77.59404, 12.97192],
                    [77.59372, 12.97192],
                    [77.59372, 12.97212]
                ]

            ],

            roads: [],

            aiConfidence: 95.4,

            crs: "EPSG:4326 / WGS84",

            captureDate: "19-Sep-2026",

            referenceId: "CAD-8840",

            decision: "APPROVED",

            decisionReason: "All required technical checks passed",

            decisionComment: "Reviewed and approved.",

            manualInspection: null,

            history: []

        },


        "PX-00122": {

            id: "PX-00122",

            device: "D-105 (Mobile)",

            source: "Imported GIS",

            area: 189.50,

            referenceArea: 201.80,

            perimeter: 61.20,

            referencePerimeter: 67.22,

            vertices: [

                [77.5928, 12.9712],

                [77.5934, 12.9712],

                [77.5934, 12.9708],

                [77.5928, 12.9708],

                [77.5928, 12.9712]

            ],

            referenceVertices: [

                [77.5927, 12.97125],

                [77.5935, 12.97125],

                [77.5935, 12.97075],

                [77.5927, 12.97075],

                [77.5927, 12.97125]

            ],

            human: null,

            buildings: [

                [
                    [77.59288, 12.97110],
                    [77.59320, 12.97110],
                    [77.59320, 12.97090],
                    [77.59288, 12.97090],
                    [77.59288, 12.97110]
                ]

            ],

            roads: [],

            aiConfidence: 62.0,

            crs: "EPSG:4326 / WGS84",

            captureDate: "19-Sep-2026",

            referenceId: "CAD-8839",

            decision: "MANUAL INSPECTION",

            decisionReason: "Low AI confidence",

            decisionComment: "Physical boundary verification required.",

            manualInspection: {

                reason: "Boundary Unclear",

                priority: "High",

                instructions: "Verify eastern boundary markers on site."

            },

            history: []

        },


        "PX-00121": {

            id: "PX-00121",

            device: "D-104 (Mobile)",

            source: "Drone Survey (ORI)",

            area: 220.62,

            referenceArea: 220.80,

            perimeter: 61.11,

            referencePerimeter: 61.20,

            vertices: [

                [77.5950, 12.9724],

                [77.5957, 12.9724],

                [77.5957, 12.9720],

                [77.5950, 12.9720],

                [77.5950, 12.9724]

            ],

            referenceVertices: [

                [77.59495, 12.97242],

                [77.59575, 12.97242],

                [77.59575, 12.97198],

                [77.59495, 12.97198],

                [77.59495, 12.97242]

            ],

            human: null,

            buildings: [],

            roads: [],

            aiConfidence: 88.9,

            crs: "EPSG:4326 / WGS84",

            captureDate: "19-Sep-2026",

            referenceId: "CAD-8838",

            decision: null,

            decisionReason: "",

            decisionComment: "",

            manualInspection: null,

            history: []

        }

    };


    /* =========================================================
       INITIALIZATION
    ========================================================== */

    document.addEventListener("DOMContentLoaded", () => {

        lucide.createIcons();

        initMap();

        renderAll();

        runValidation();

    });


    /* =========================================================
       MAP INITIALIZATION
    ========================================================== */

    function initMap() {

        map = L.map("map", {
            zoomControl: false
        }).setView(
            [12.97165, 77.59425],
            19
        );


        /* Satellite */
        satelliteLayer = L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
                attribution: "Esri World Imagery",
                maxZoom: 20
            }
        );


        /* Street */
        streetLayer = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: "&copy; OpenStreetMap contributors",
                maxZoom: 20
            }
        );


        satelliteLayer.addTo(map);

        L.control.zoom({
            position: "bottomright"
        }).addTo(map);


        aiLayer = L.layerGroup().addTo(map);

        refLayer = L.layerGroup().addTo(map);

        humanLayer = L.layerGroup().addTo(map);

        buildingLayer = L.layerGroup().addTo(map);

        roadLayer = L.layerGroup().addTo(map);


        loadParcelLayers(activeParcelId);

    }


    /* =========================================================
       BASE MAP SWITCH
    ========================================================== */

    function setBaseMap(type) {

        if (type === "satellite") {

            if (map.hasLayer(streetLayer)) {
                map.removeLayer(streetLayer);
            }

            if (!map.hasLayer(satelliteLayer)) {
                satelliteLayer.addTo(map);
            }

            document.getElementById("btn-satellite").className =
                "px-2.5 py-1 rounded text-xs font-medium bg-sky-950 text-sky-400 border border-sky-800";

            document.getElementById("btn-street").className =
                "px-2.5 py-1 rounded text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600";

        }

        if (type === "street") {

            if (map.hasLayer(satelliteLayer)) {
                map.removeLayer(satelliteLayer);
            }

            if (!map.hasLayer(streetLayer)) {
                streetLayer.addTo(map);
            }

            document.getElementById("btn-street").className =
                "px-2.5 py-1 rounded text-xs font-medium bg-sky-950 text-sky-400 border border-sky-800";

            document.getElementById("btn-satellite").className =
                "px-2.5 py-1 rounded text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600";

        }

    }


    /* =========================================================
       LOAD GIS LAYERS
    ========================================================== */

    function loadParcelLayers(parcelId) {

        aiLayer.clearLayers();

        refLayer.clearLayers();

        humanLayer.clearLayers();

        buildingLayer.clearLayers();

        roadLayer.clearLayers();


        const data =
            parcelsData[parcelId] ||
            parcelsData["PX-00124"];


        /* AI CANDIDATE */
        L.polygon(
            data.vertices.map(p => [p[1], p[0]]),
            {
                color: "#ef4444",
                weight: 3,
                fillColor: "#ef4444",
                fillOpacity: 0.20
            }
        ).addTo(aiLayer);


        /* CADASTRAL REFERENCE */
        L.polygon(
            data.referenceVertices.map(p => [p[1], p[0]]),
            {
                color: "#3b82f6",
                weight: 3,
                dashArray: "8,6",
                fillColor: "#3b82f6",
                fillOpacity: 0.10
            }
        ).addTo(refLayer);


        /* HUMAN EDITED */
        if (data.human && data.human.length >= 4) {

            L.polygon(
                data.human.map(p => [p[1], p[0]]),
                {
                    color: "#10b981",
                    weight: 3,
                    dashArray: "3,5",
                    fillColor: "#10b981",
                    fillOpacity: 0.18
                }
            ).addTo(humanLayer);

        }


        /* BUILDINGS */
        (data.buildings || []).forEach(building => {

            L.polygon(
                building.map(p => [p[1], p[0]]),
                {
                    color: "#f59e0b",
                    weight: 2,
                    fillColor: "#f59e0b",
                    fillOpacity: 0.25
                }
            ).addTo(buildingLayer);

        });


        /* ROADS */
        (data.roads || []).forEach(road => {

            L.polyline(
                road.map(p => [p[1], p[0]]),
                {
                    color: "#f8fafc",
                    weight: 5,
                    opacity: .60
                }
            ).addTo(roadLayer);

        });


        const bounds = L.latLngBounds(
            data.vertices.map(p => [p[1], p[0]])
        );

        map.fitBounds(
            bounds,
            {
                padding: [60, 60]
            }
        );


        if (editMode) {
            createEditableMarkers();
        }

    }


    /* =========================================================
       LAYER TOGGLES
    ========================================================== */

    function toggleLayer(type) {

        let layer;
        let button;

        if (type === "ai") {
            layer = aiLayer;
            button = document.getElementById("toggle-ai");
        }

        if (type === "ref") {
            layer = refLayer;
            button = document.getElementById("toggle-ref");
        }

        if (type === "human") {
            layer = humanLayer;
            button = document.getElementById("toggle-human");
        }


        if (!layer) return;


        if (map.hasLayer(layer)) {

            map.removeLayer(layer);

            button.textContent =
                button.textContent.replace("☑", "☐");

        } else {

            layer.addTo(map);

            button.textContent =
                button.textContent.replace("☐", "☑");

        }

    }


    /* =========================================================
       NAVIGATION
    ========================================================== */

    function switchView(viewName) {

        document
            .querySelectorAll("main > section")
            .forEach(sec => sec.classList.add("hidden"));


        document
            .querySelectorAll(".tab-btn")
            .forEach(btn => btn.classList.remove("active"));


        const target =
            document.getElementById(`view-${viewName}`);

        if (target) {
            target.classList.remove("hidden");
        }


        const activeBtn =
            document.getElementById(`nav-${viewName}`);

        if (activeBtn) {
            activeBtn.classList.add("active");
        }


        if (viewName === "viewer" && map) {

            setTimeout(() => {

                map.invalidateSize();

                loadParcelLayers(activeParcelId);

            }, 150);

        }


        if (viewName === "validation") {
            runValidation();
        }

        if (viewName === "reference") {
            renderReference();
        }

        if (viewName === "comparison") {
            renderComparison();
        }

        if (viewName === "manual") {
            renderManualPanel();
        }

    }


    /* =========================================================
       SELECT PARCEL
    ========================================================== */

    function selectParcel(id) {

        if (!parcelsData[id]) return;

        activeParcelId = id;

        selectedDecision =
            parcelsData[id].decision || null;


        document.getElementById("top-parcel-id").textContent = id;

        document.getElementById("top-device-id").textContent =
            parcelsData[id].device;


        updateTopStatus();

        loadParcelLayers(id);

        renderAll();

        switchView("viewer");

        addAuditLog(
            id,
            "Parcel selected for human review"
        );

    }


    /* =========================================================
       EDIT MODE
    ========================================================== */

    function toggleEditMode() {

        editMode = !editMode;

        const button =
            document.getElementById("edit-button");


        if (editMode) {

            button.classList.remove("bg-slate-700");

            button.classList.add(
                "bg-sky-600",
                "text-white"
            );

            createEditableMarkers();

            addAuditLog(
                activeParcelId,
                "Geometry edit mode enabled"
            );

        } else {

            button.classList.remove(
                "bg-sky-600"
            );

            button.classList.add(
                "bg-slate-700"
            );

            removeEditableMarkers();

            addAuditLog(
                activeParcelId,
                "Geometry edit mode disabled"
            );

        }

    }


    function createEditableMarkers() {

        removeEditableMarkers();

        const data =
            parcelsData[activeParcelId];


        data.vertices.forEach(
            (coord, index) => {

                const marker =
                    L.marker(
                        [coord[1], coord[0]],
                        {
                            draggable: true,
                            icon: L.divIcon({
                                className: "",
                                html: `<div class="vertex-marker"></div>`,
                                iconSize: [11,11],
                                iconAnchor: [5,5]
                            })
                        }
                    ).addTo(map);


                marker.on(
                    "dragend",
                    function(event) {

                        const position =
                            event.target.getLatLng();


                        data.vertices[index] = [
                            position.lng,
                            position.lat
                        ];


                        data.human =
                            data.vertices.map(
                                p => [...p]
                            );


                        loadParcelLayers(
                            activeParcelId
                        );


                        if (editMode) {
                            createEditableMarkers();
                        }


                        recalculateGeometry();

                        addAuditLog(
                            activeParcelId,
                            `Vertex ${index + 1} moved by reviewer`
                        );

                    }
                );


                editableMarkers.push(marker);

            }
        );

    }


    function removeEditableMarkers() {

        editableMarkers.forEach(
            marker => map.removeLayer(marker)
        );

        editableMarkers = [];

    }


    /* =========================================================
       ADD VERTEX
    ========================================================== */

    function addVertexMode() {

        if (!editMode) {

            alert(
                "Enable Edit Geometry first."
            );

            return;
        }


        addingVertex = true;

        alert(
            "Click anywhere on the map to add a new parcel vertex."
        );


        map.once(
            "click",
            function(event) {

                if (!addingVertex) return;

                const data =
                    parcelsData[activeParcelId];


                data.vertices.splice(
                    data.vertices.length - 1,
                    0,
                    [
                        event.latlng.lng,
                        event.latlng.lat
                    ]
                );


                data.human =
                    data.vertices.map(
                        p => [...p]
                    );


                addingVertex = false;


                loadParcelLayers(
                    activeParcelId
                );


                createEditableMarkers();

                recalculateGeometry();

                addAuditLog(
                    activeParcelId,
                    "New parcel vertex added"
                );

            }
        );

    }


    /* =========================================================
       DELETE VERTEX
    ========================================================== */

    function deleteLastVertex() {

        const data =
            parcelsData[activeParcelId];


        if (data.vertices.length <= 4) {

            alert(
                "A polygon needs at least 3 unique vertices."
            );

            return;
        }


        data.vertices.splice(
            data.vertices.length - 2,
            1
        );


        data.vertices[
            data.vertices.length - 1
        ] = [
            ...data.vertices[0]
        ];


        data.human =
            data.vertices.map(
                p => [...p]
            );


        loadParcelLayers(
            activeParcelId
        );


        if (editMode) {
            createEditableMarkers();
        }


        recalculateGeometry();

        addAuditLog(
            activeParcelId,
            "Last parcel vertex deleted"
        );

    }


    /* =========================================================
       GEOMETRY CALCULATION
    ========================================================== */

    function getPolygonFeature(data) {

        let coords =
            data.vertices.map(
                p => [...p]
            );


        if (
            coords[0][0] !== coords[coords.length - 1][0] ||
            coords[0][1] !== coords[coords.length - 1][1]
        ) {
            coords.push(
                [...coords[0]]
            );
        }


        return turf.polygon([
            coords
        ]);

    }


    function calculateArea(data) {

        return turf.area(
            getPolygonFeature(data)
        );

    }


    function calculatePerimeter(data) {

        const polygon =
            getPolygonFeature(data);


        const ring =
            polygon.geometry.coordinates[0];


        return turf.length(
            turf.lineString(ring),
            {
                units: "meters"
            }
        );

    }


    function recalculateGeometry() {

        const data =
            parcelsData[activeParcelId];


        data.area =
            Number(
                calculateArea(data).toFixed(2)
            );


        data.perimeter =
            Number(
                calculatePerimeter(data).toFixed(2)
            );


        renderAll();

    }


    /* =========================================================
       VALIDATION ENGINE
    ========================================================== */

    function performValidation(data) {

        const polygon =
            getPolygonFeature(data);


        const area =
            calculateArea(data);


        const perimeter =
            calculatePerimeter(data);


        let selfIntersection = false;

        try {

            const kinks =
                turf.kinks(polygon);

            selfIntersection =
                kinks.features.length > 0;

        } catch (error) {

            selfIntersection = false;

        }


        let referenceOverlap = false;

        try {

            const ref =
                turf.polygon([
                    data.referenceVertices
                ]);

            const intersection =
                turf.intersect(
                    polygon,
                    ref
                );

            referenceOverlap =
                !!intersection;

        } catch (error) {

            referenceOverlap = false;

        }


        const areaDifference =
            Math.abs(
                area - data.referenceArea
            );


        const areaDifferencePercent =
            (
                areaDifference /
                data.referenceArea
            ) * 100;


        const perimeterDifferencePercent =
            (
                Math.abs(
                    perimeter -
                    data.referencePerimeter
                ) /
                data.referencePerimeter
            ) * 100;


        const aiPass =
            data.aiConfidence >= 85;


        const geometryPass =
            !selfIntersection &&
            data.vertices.length >= 4;


        const referencePass =
            areaDifferencePercent <= 5;


        let score = 100;


        if (!geometryPass) {
            score -= 30;
        }

        if (selfIntersection) {
            score -= 25;
        }

        if (areaDifferencePercent > 2) {
            score -= 10;
        }

        if (areaDifferencePercent > 5) {
            score -= 15;
        }

        if (perimeterDifferencePercent > 5) {
            score -= 10;
        }

        if (!aiPass) {
            score -= 15;
        }


        score =
            Math.max(
                0,
                Math.round(score)
            );


        const checks = [

            {
                category: "Geometry",
                name: "Polygon closed",
                pass: data.vertices.length >= 4,
                value: data.vertices.length >= 4
                    ? "PASS"
                    : "FAIL",
                detail: data.vertices.length >= 4
                    ? "Closed polygon ring available."
                    : "Insufficient geometry vertices."
            },

            {
                category: "Geometry",
                name: "No self-intersection",
                pass: !selfIntersection,
                value: !selfIntersection
                    ? "PASS"
                    : "FAIL",
                detail: !selfIntersection
                    ? "No crossing polygon edges detected."
                    : "Polygon edges intersect."
            },

            {
                category: "Geometry",
                name: "Valid vertex structure",
                pass: data.vertices.length >= 4,
                value: data.vertices.length >= 4
                    ? "PASS"
                    : "FAIL",
                detail:
                    `${data.vertices.length} coordinate nodes supplied.`
            },

            {
                category: "Topology",
                name: "Reference relationship",
                pass: true,
                warning: referenceOverlap,
                value: referenceOverlap
                    ? "WARNING"
                    : "PASS",
                detail: referenceOverlap
                    ? "Candidate and cadastral reference overlap — human interpretation required."
                    : "No special overlap warning detected in this demo."
            },

            {
                category: "Reference",
                name: "Area difference",
                pass: areaDifferencePercent <= 2,
                warning:
                    areaDifferencePercent > 2 &&
                    areaDifferencePercent <= 5,
                value:
                    areaDifferencePercent <= 2
                        ? "PASS"
                        : areaDifferencePercent <= 5
                            ? "WARNING"
                            : "FAIL",
                detail:
                    `${areaDifference.toFixed(2)} m² difference (${areaDifferencePercent.toFixed(2)}%).`
            },

            {
                category: "Reference",
                name: "Perimeter difference",
                pass: perimeterDifferencePercent <= 2,
                warning:
                    perimeterDifferencePercent > 2 &&
                    perimeterDifferencePercent <= 5,
                value:
                    perimeterDifferencePercent <= 2
                        ? "PASS"
                        : perimeterDifferencePercent <= 5
                            ? "WARNING"
                            : "FAIL",
                detail:
                    `${perimeterDifferencePercent.toFixed(2)}% perimeter difference.`
            },

            {
                category: "AI Quality",
                name: "AI confidence",
                pass: aiPass,
                warning:
                    data.aiConfidence >= 75 &&
                    data.aiConfidence < 85,
                value:
                    data.aiConfidence >= 85
                        ? "PASS"
                        : data.aiConfidence >= 75
                            ? "WARNING"
                            : "FAIL",
                detail:
                    `${data.aiConfidence.toFixed(1)}% model confidence.`
            },

            {
                category: "Spatial Reference",
                name: "CRS available",
                pass: !!data.crs,
                value: data.crs
                    ? "PASS"
                    : "FAIL",
                detail:
                    data.crs ||
                    "Missing spatial reference."
            },

            {
                category: "Attributes",
                name: "Reference ID available",
                pass: !!data.referenceId,
                value: data.referenceId
                    ? "PASS"
                    : "FAIL",
                detail:
                    data.referenceId ||
                    "Reference identifier unavailable."
            }

        ];


        return {

            area,

            perimeter,

            areaDifference,

            areaDifferencePercent,

            perimeterDifferencePercent,

            score,

            checks,

            overall:
                score >= 90
                    ? "VALID"
                    : score >= 70
                        ? "NEEDS REVIEW"
                        : "MANUAL INSPECTION"

        };

    }


    /* =========================================================
       RUN VALIDATION
    ========================================================== */

    function runValidation() {

        const data =
            parcelsData[activeParcelId];


        const result =
            performValidation(data);


        document.getElementById(
            "qa-score"
        ).textContent =
            `${result.score}%`;


        document.getElementById(
            "qa-score"
        ).className =
            result.score >= 90
                ? "text-2xl font-black text-emerald-400"
                : result.score >= 70
                    ? "text-2xl font-black text-amber-400"
                    : "text-2xl font-black text-rose-400";


        const statusEl =
            document.getElementById(
                "qa-status"
            );


        if (result.overall === "VALID") {

            statusEl.textContent =
                "TECHNICALLY VALID";

            statusEl.className =
                "bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-1 rounded";

        } else if (result.overall === "NEEDS REVIEW") {

            statusEl.textContent =
                "NEEDS HUMAN REVIEW";

            statusEl.className =
                "bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold px-2 py-1 rounded";

        } else {

            statusEl.textContent =
                "MANUAL INSPECTION";

            statusEl.className =
                "bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-bold px-2 py-1 rounded";

        }


        document.getElementById(
            "validation-subtitle"
        ).textContent =
            `Technical QA report for Parcel ${data.id}`;


        renderValidationCards(
            result.checks
        );


        let explanation =
            "No major technical issue was detected.";

        const failedChecks =
            result.checks.filter(
                c => !c.pass && !c.warning
            );

        const warningChecks =
            result.checks.filter(
                c => c.warning
            );


        if (failedChecks.length > 0) {

            explanation =
                failedChecks
                    .map(
                        c => `${c.name}: ${c.detail}`
                    )
                    .join(" ");

        } else if (warningChecks.length > 0) {

            explanation =
                warningChecks
                    .map(
                        c => `${c.name}: ${c.detail}`
                    )
                    .join(" ");

        }


        document.getElementById(
            "explain-why"
        ).textContent =
            explanation;


        const problemText =
            document.getElementById(
                "problem-text"
            );


        if (result.overall === "VALID") {

            problemText.textContent =
                "Technical validation passed. Human review can still compare the candidate with the cadastral reference before approval.";

        } else {

            problemText.textContent =
                failedChecks.length > 0
                    ? failedChecks[0].detail
                    : warningChecks.length > 0
                        ? warningChecks[0].detail
                        : "Human review required.";

        }


        return result;

    }


    /* =========================================================
       VALIDATION CARDS
    ========================================================== */

    function renderValidationCards(checks) {

        const groups = {};

        checks.forEach(
            check => {

                if (!groups[check.category]) {
                    groups[check.category] = [];
                }

                groups[check.category].push(
                    check
                );

            }
        );


        document.getElementById(
            "validation-grid"
        ).innerHTML =
            Object.entries(groups)
                .map(
                    ([category, list]) => {

                        const icon =
                            category === "Geometry"
                                ? "hexagon"
                                : category === "Topology"
                                    ? "git-fork"
                                    : category === "Reference"
                                        ? "database"
                                        : category === "AI Quality"
                                            ? "brain-circuit"
                                            : category === "Spatial Reference"
                                                ? "globe"
                                                : "file-check";


                        return `

                        <div class="bg-gis-800 p-4 rounded-xl border border-slate-800 space-y-3">

                            <h3 class="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-2">

                                <i data-lucide="${icon}" class="w-4 h-4 text-sky-400"></i>

                                ${category}

                            </h3>

                            <ul class="space-y-2 text-xs">

                                ${list.map(
                                    c => {

                                        const color =
                                            c.value === "PASS"
                                                ? "text-emerald-400"
                                                : c.value === "WARNING"
                                                    ? "text-amber-400"
                                                    : "text-rose-400";


                                        return `

                                        <li class="flex items-start justify-between gap-4 ${color}">

                                            <div>

                                                <div class="font-medium">
                                                    ${c.value === "PASS" ? "✓" : c.value === "WARNING" ? "⚠" : "✕"}
                                                    ${c.name}
                                                </div>

                                                <div class="text-[10px] text-slate-500 mt-0.5">
                                                    ${c.detail}
                                                </div>

                                            </div>

                                            <span class="font-mono text-[10px] shrink-0">
                                                ${c.value}
                                            </span>

                                        </li>

                                        `;

                                    }
                                ).join("")}

                            </ul>

                        </div>

                        `;

                    }
                )
                .join("");


        lucide.createIcons();

    }


    /* =========================================================
       TOP STATUS
    ========================================================== */

    function updateTopStatus() {

        const data =
            parcelsData[activeParcelId];


        const status =
            data.decision ||
            "UNDER REVIEW";


        const element =
            document.getElementById(
                "top-parcel-status"
            );


        element.textContent =
            status;


        if (status === "APPROVED") {

            element.className =
                "bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px] tracking-wider";

        } else if (status === "REJECTED") {

            element.className =
                "bg-orange-950 text-orange-400 border border-orange-800 px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px] tracking-wider";

        } else if (status === "MANUAL INSPECTION") {

            element.className =
                "bg-amber-950 text-amber-400 border border-amber-800 px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px] tracking-wider";

        } else if (status === "DENIED") {

            element.className =
                "bg-rose-950 text-rose-400 border border-rose-800 px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px] tracking-wider";

        } else {

            element.className =
                "bg-amber-950/80 text-amber-400 border border-amber-800 px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px] tracking-wider";

        }


        updateDecisionDisplay();

    }


    /* =========================================================
       DECISION DISPLAY
    ========================================================== */

    function updateDecisionDisplay() {

        const data =
            parcelsData[activeParcelId];


        const display =
            document.getElementById(
                "decision-display"
            );


        const text =
            document.getElementById(
                "decision-text"
            );


        const subtext =
            document.getElementById(
                "decision-subtext"
            );


        if (!data.decision) {

            display.className =
                "decision-banner bg-slate-900 border border-slate-700 rounded-lg p-3";


            text.textContent =
                "NOT DECIDED";

            text.className =
                "text-sm font-black text-amber-400 mt-1";

            subtext.textContent =
                "Complete validation and select a workflow.";

            return;

        }


        text.textContent =
            data.decision;


        if (
            data.decision === "APPROVED"
        ) {

            display.className =
                "decision-banner decision-selected bg-emerald-950/30 border border-emerald-800 rounded-lg p-3";

            text.className =
                "text-sm font-black text-emerald-400 mt-1";

        }

        else if (
            data.decision === "REJECTED"
        ) {

            display.className =
                "decision-banner decision-selected bg-orange-950/30 border border-orange-800 rounded-lg p-3";

            text.className =
                "text-sm font-black text-orange-400 mt-1";

        }

        else if (
            data.decision === "MANUAL INSPECTION"
        ) {

            display.className =
                "decision-banner decision-selected bg-amber-950/30 border border-amber-800 rounded-lg p-3";

            text.className =
                "text-sm font-black text-amber-400 mt-1";

        }

        else if (
            data.decision === "DENIED"
        ) {

            display.className =
                "decision-banner decision-selected bg-rose-950/30 border border-rose-800 rounded-lg p-3";

            text.className =
                "text-sm font-black text-rose-400 mt-1";

        }


        subtext.innerHTML =
            `<strong>Reason:</strong> ${data.decisionReason || "Not specified"}<br>
             <strong>Comment:</strong> ${data.decisionComment || "None"}`;

    }


    /* =========================================================
       DECISION MODAL
    ========================================================== */

    function openDecisionModal(type) {

        currentDecisionType = type;


        const title =
            document.getElementById(
                "decision-modal-title"
            );

        const subtitle =
            document.getElementById(
                "decision-modal-subtitle"
            );

        const reasonSelect =
            document.getElementById(
                "decision-reason"
            );


        const confirmButton =
            document.getElementById(
                "confirm-decision-button"
            );


        const reasons = {

            APPROVE: [
                "All required QA checks passed",
                "Human review accepted candidate",
                "Reference comparison acceptable",
                "Geometry manually corrected and verified"
            ],

            REJECT: [
                "Boundary needs correction",
                "Topology issue requires correction",
                "Reference mismatch requires correction",
                "AI-generated geometry unsuitable",
                "Return to field device for correction"
            ],

            DENY: [
                "Invalid geometry",
                "Insufficient source data",
                "Severe topology failure",
                "Reference conflict cannot be resolved",
                "Unsupported / unreliable input"
            ]

        };


        title.textContent =
            type === "APPROVE"
                ? "Approve Parcel"
                : type === "REJECT"
                    ? "Reject / Return Parcel"
                    : "Deny Parcel";


        subtitle.textContent =
            type === "APPROVE"
                ? "The reviewed parcel will be marked approved and prepared for return to the field device."
                : type === "REJECT"
                    ? "The field device will receive a correction-required status."
                    : "The parcel will be marked denied and the reason will be recorded in the audit trail.";


        reasonSelect.innerHTML =
            reasons[type]
                .map(
                    reason =>
                        `<option>${reason}</option>`
                )
                .join("");


        confirmButton.className =
            type === "APPROVE"
                ? "flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-xs"
                : type === "REJECT"
                    ? "flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-lg text-xs"
                    : "flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 rounded-lg text-xs";


        confirmButton.textContent =
            type === "APPROVE"
                ? "Confirm Approval"
                : type === "REJECT"
                    ? "Confirm Rejection"
                    : "Confirm Denial";


        document.getElementById(
            "decision-comment"
        ).value = "";


        document.getElementById(
            "modal-decision"
        ).classList.remove(
            "hidden"
        );

    }


    function closeDecisionModal() {

        document.getElementById(
            "modal-decision"
        ).classList.add(
            "hidden"
        );

    }


    /* =========================================================
       CONFIRM DECISION
    ========================================================== */

    function confirmDecision() {

        const data =
            parcelsData[activeParcelId];


        const reason =
            document.getElementById(
                "decision-reason"
            ).value;


        const comment =
            document.getElementById(
                "decision-comment"
            ).value.trim();


        data.decision =
            currentDecisionType === "APPROVE"
                ? "APPROVED"
                : currentDecisionType === "REJECT"
                    ? "REJECTED"
                    : "DENIED";


        data.decisionReason =
            reason;


        data.decisionComment =
            comment ||
            "No additional comment.";


        data.decisionTime =
            new Date().toISOString();


        addAuditLog(
            activeParcelId,
            `${data.decision}: ${reason}`
        );


        closeDecisionModal();


        selectedDecision =
            data.decision;


        updateTopStatus();

        renderAll();


        startTransmit(
            data.decision
        );

    }


    /* =========================================================
       MANUAL INSPECTION
    ========================================================== */

    function openManualModal() {

        document.getElementById(
            "modal-manual"
        ).classList.remove(
            "hidden"
        );

    }


    function closeManualModal() {

        document.getElementById(
            "modal-manual"
        ).classList.add(
            "hidden"
        );

    }


    function submitManualInspection() {

        const data =
            parcelsData[activeParcelId];


        data.decision =
            "MANUAL INSPECTION";


        data.decisionReason =
            document.getElementById(
                "manual-reason"
            ).value;


        data.decisionComment =
            document.getElementById(
                "manual-instructions"
            ).value.trim() ||
            "Field verification required.";


        data.manualInspection = {

            reason:
                document.getElementById(
                    "manual-reason"
                ).value,

            priority:
                document.getElementById(
                    "manual-priority"
                ).value,

            instructions:
                document.getElementById(
                    "manual-instructions"
                ).value.trim(),

            requestedAt:
                new Date().toISOString(),

            status:
                "DISPATCHED TO FIELD"

        };


        addAuditLog(
            activeParcelId,
            `Manual inspection dispatched — ${data.manualInspection.reason} — Priority: ${data.manualInspection.priority}`
        );


        closeManualModal();


        updateTopStatus();

        renderAll();

        startTransmit(
            "MANUAL INSPECTION"
        );

    }


    /* =========================================================
       TRANSMISSION BACK TO SAME PHONE
    ========================================================== */

    function sendCurrentPackage() {

        const data =
            parcelsData[activeParcelId];


        if (!data.decision) {

            alert(
                "Please select Approve, Reject, Manual Inspection or Deny first."
            );

            return;

        }


        startTransmit(
            data.decision
        );

    }


    let transmitTimer = null;

    function startTransmit(decision) {

        if (transmitTimer) {
            clearInterval(transmitTimer);
            transmitTimer = null;
        }

        const data =
            parcelsData[activeParcelId];


        const modal =
            document.getElementById(
                "modal-transmit"
            );


        const bar =
            document.getElementById(
                "transmit-bar"
            );


        const status =
            document.getElementById(
                "transmit-status"
            );


        document.getElementById(
            "transmit-device"
        ).textContent =
            data.device;


        modal.classList.remove(
            "hidden"
        );


        bar.style.width =
            "0%";


        status.textContent =
            "Preparing reviewed parcel package...";


        let progress = 0;


        transmitTimer =
            setInterval(
                () => {

                    progress += 20;

                    bar.style.width =
                        `${progress}%`;


                    if (progress === 20) {

                        status.textContent =
                            "Packaging geometry + metadata...";

                    }

                    if (progress === 40) {

                        status.textContent =
                            "Packaging QA + topology results...";

                    }

                    if (progress === 60) {

                        status.textContent =
                            "Packaging reviewer decision...";

                    }

                    if (progress === 80) {

                        status.textContent =
                            "Transmitting to field phone...";

                    }

                    if (progress >= 100) {

                        clearInterval(
                            transmitTimer
                        );

                        transmitTimer = null;


                        status.textContent =
                            `✓ ${decision} result sent to ${data.device}`;


                        addAuditLog(
                            activeParcelId,
                            `Review package transmitted to ${data.device} — Decision: ${decision}`
                        );


                        setTimeout(
                            () => {

                                modal.classList.add(
                                    "hidden"
                                );

                                showTransmissionComplete();

                            },
                            900
                        );

                    }

                },
                300
            );

    }


    function showTransmissionComplete() {

        const data =
            parcelsData[activeParcelId];


        alert(
            `Review package sent successfully.\n\nParcel: ${data.id}\nDevice: ${data.device}\nDecision: ${data.decision}`
        );

    }


    /* =========================================================
       RECEIVE FROM PHONE
    ========================================================== */

    function openReceiveModal() {

        document.getElementById(
            "modal-receive"
        ).classList.remove(
            "hidden"
        );

    }


    function closeReceiveModal() {

        document.getElementById(
            "modal-receive"
        ).classList.add(
            "hidden"
        );

    }


    function simulateIncomingParcel() {

        const newId =
            "PX-" +
            String(
                Math.floor(
                    10000 +
                    Math.random() * 89999
                )
            );


        const template =
            structuredClone(
                parcelsData["PX-00124"]
            );


        template.id =
            newId;


        template.device =
            "D-102 (Mobile)";


        template.decision =
            null;


        template.decisionReason =
            "";


        template.decisionComment =
            "";


        template.manualInspection =
            null;


        template.captureDate =
            new Date()
                .toLocaleDateString(
                    "en-GB",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );


        parcelsData[newId] =
            template;


        activeParcelId =
            newId;


        document.getElementById(
            "top-parcel-id"
        ).textContent =
            newId;


        document.getElementById(
            "top-device-id"
        ).textContent =
            "D-102 (Mobile)";


        closeReceiveModal();


        addAuditLog(
            newId,
            "Received parcel payload from field phone D-102"
        );


        renderAll();

        switchView(
            "viewer"
        );


        alert(
            `New parcel ${newId} received from field phone D-102.`
        );

    }


    /* =========================================================
       ZOOM PROBLEM
    ========================================================== */

    function zoomToProblem() {

        switchView(
            "viewer"
        );


        const data =
            parcelsData[activeParcelId];


        const bounds =
            L.latLngBounds(
                data.vertices.map(
                    p => [p[1], p[0]]
                )
            );


        map.fitBounds(
            bounds,
            {
                padding: [30,30],
                maxZoom: 21
            }
        );

    }


    /* =========================================================
       METADATA
    ========================================================== */

    function renderMetadata() {

        const data =
            parcelsData[activeParcelId];


        const calculatedArea =
            calculateArea(data);


        const calculatedPerimeter =
            calculatePerimeter(data);


        document.getElementById(
            "parcel-metadata"
        ).innerHTML = `

            <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">Parcel ID</span>
                <span class="font-mono font-bold text-white">${data.id}</span>
            </div>

            <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">Area</span>
                <span class="font-mono font-bold text-sky-400">
                    ${calculatedArea.toFixed(2)} m²
                </span>
            </div>

            <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">Perimeter</span>
                <span class="font-mono text-slate-200">
                    ${calculatedPerimeter.toFixed(2)} m
                </span>
            </div>

            <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">Vertices</span>
                <span class="font-mono text-slate-200">
                    ${data.vertices.length}
                </span>
            </div>

            <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">CRS</span>
                <span class="font-mono text-slate-200">
                    ${data.crs}
                </span>
            </div>

            <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">Source</span>
                <span class="text-slate-200">
                    ${data.source}
                </span>
            </div>

            <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">Reference ID</span>
                <span class="font-mono text-blue-400">
                    ${data.referenceId}
                </span>
            </div>

            <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">AI Confidence</span>
                <span class="font-bold ${data.aiConfidence >= 85 ? "text-emerald-400" : "text-rose-400"}">
                    ${data.aiConfidence.toFixed(1)}%
                </span>
            </div>

            <div class="flex justify-between border-b border-slate-800 pb-1.5">
                <span class="text-slate-400">Capture Date</span>
                <span class="text-slate-200">
                    ${data.captureDate}
                </span>
            </div>

        `;

    }


    /* =========================================================
       REFERENCE
    ========================================================== */

    function renderReference() {

        const data =
            parcelsData[activeParcelId];


        const candidateArea =
            calculateArea(data);


        const candidatePerimeter =
            calculatePerimeter(data);


        const humanArea =
            data.human
                ? turf.area(
                    turf.polygon([
                        data.human
                    ])
                )
                : candidateArea;


        const humanPerimeter =
            data.human
                ? turf.length(
                    turf.lineString(
                        data.human
                    ),
                    {
                        units: "meters"
                    }
                )
                : candidatePerimeter;


        document.getElementById(
            "reference-candidate-stats"
        ).innerHTML = statBlock(
            [
                ["Area", `${candidateArea.toFixed(2)} m²`],
                ["Perimeter", `${candidatePerimeter.toFixed(2)} m`],
                ["Confidence", `${data.aiConfidence.toFixed(1)}%`],
                ["Vertices", data.vertices.length]
            ]
        );


        document.getElementById(
            "reference-cadastral-stats"
        ).innerHTML = statBlock(
            [
                ["Area", `${data.referenceArea.toFixed(2)} m²`],
                ["Perimeter", `${data.referencePerimeter.toFixed(2)} m`],
                ["Reference ID", data.referenceId],
                ["Vertices", data.referenceVertices.length]
            ]
        );


        document.getElementById(
            "reference-human-stats"
        ).innerHTML = statBlock(
            [
                ["Area", `${humanArea.toFixed(2)} m²`],
                ["Perimeter", `${humanPerimeter.toFixed(2)} m`],
                ["Status", data.decision || "NOT DECIDED"],
                ["Vertices", data.human ? data.human.length : data.vertices.length]
            ]
        );


        const areaDiff =
            Math.abs(
                candidateArea -
                data.referenceArea
            );


        const areaDiffPercent =
            (
                areaDiff /
                data.referenceArea
            ) * 100;


        const perimeterDiff =
            Math.abs(
                candidatePerimeter -
                data.referencePerimeter
            );


        const perimeterDiffPercent =
            (
                perimeterDiff /
                data.referencePerimeter
            ) * 100;


        document.getElementById(
            "reference-table"
        ).innerHTML = `

            <table class="w-full text-left">

                <thead>
                    <tr class="border-b border-slate-700">
                        <th class="p-2 text-slate-400">Metric</th>
                        <th class="p-2 text-red-400">AI Candidate</th>
                        <th class="p-2 text-blue-400">Cadastral Reference</th>
                        <th class="p-2 text-amber-400">Difference</th>
                    </tr>
                </thead>

                <tbody>

                    <tr class="border-b border-slate-800">
                        <td class="p-2">Area</td>
                        <td class="p-2 font-mono">${candidateArea.toFixed(2)} m²</td>
                        <td class="p-2 font-mono">${data.referenceArea.toFixed(2)} m²</td>
                        <td class="p-2 font-mono text-amber-400">
                            ${areaDiff.toFixed(2)} m² (${areaDiffPercent.toFixed(2)}%)
                        </td>
                    </tr>

                    <tr class="border-b border-slate-800">
                        <td class="p-2">Perimeter</td>
                        <td class="p-2 font-mono">${candidatePerimeter.toFixed(2)} m</td>
                        <td class="p-2 font-mono">${data.referencePerimeter.toFixed(2)} m</td>
                        <td class="p-2 font-mono text-amber-400">
                            ${perimeterDiff.toFixed(2)} m (${perimeterDiffPercent.toFixed(2)}%)
                        </td>
                    </tr>

                    <tr>
                        <td class="p-2">CRS</td>
                        <td class="p-2 font-mono">${data.crs}</td>
                        <td class="p-2 font-mono">${data.crs}</td>
                        <td class="p-2 text-emerald-400">Available</td>
                    </tr>

                </tbody>

            </table>
        `;

    }


    function statBlock(rows) {

        return `

            <div class="space-y-2 text-xs">

                ${rows.map(
                    ([label,value]) => `

                        <div class="flex justify-between border-b border-slate-800 pb-1.5">

                            <span class="text-slate-400">
                                ${label}
                            </span>

                            <span class="font-mono text-white">
                                ${value}
                            </span>

                        </div>

                    `
                ).join("")}

            </div>

        `;

    }


    /* =========================================================
       COMPARISON
    ========================================================== */

    function renderComparison() {

        const data =
            parcelsData[activeParcelId];


        const candidateArea =
            calculateArea(data);


        const candidatePerimeter =
            calculatePerimeter(data);


        const refArea =
            data.referenceArea;


        const refPerimeter =
            data.referencePerimeter;


        const humanArea =
            data.human
                ? turf.area(
                    turf.polygon([
                        data.human
                    ])
                )
                : candidateArea;


        const humanPerimeter =
            data.human
                ? turf.length(
                    turf.lineString(
                        data.human
                    ),
                    {
                        units: "meters"
                    }
                )
                : candidatePerimeter;


        document.getElementById(
            "comparison-ai"
        ).innerHTML =
            comparisonBlock(
                [
                    ["Area", `${candidateArea.toFixed(2)} m²`],
                    ["Perimeter", `${candidatePerimeter.toFixed(2)} m`],
                    ["Nodes", data.vertices.length],
                    ["AI Confidence", `${data.aiConfidence.toFixed(1)}%`]
                ]
            );


        document.getElementById(
            "comparison-ref"
        ).innerHTML =
            comparisonBlock(
                [
                    ["Area", `${refArea.toFixed(2)} m²`],
                    ["Perimeter", `${refPerimeter.toFixed(2)} m`],
                    ["Nodes", data.referenceVertices.length],
                    ["Reference ID", data.referenceId]
                ]
            );


        document.getElementById(
            "comparison-human"
        ).innerHTML =
            comparisonBlock(
                [
                    ["Area", `${humanArea.toFixed(2)} m²`],
                    ["Perimeter", `${humanPerimeter.toFixed(2)} m`],
                    ["Nodes", data.human ? data.human.length : data.vertices.length],
                    ["Decision", data.decision || "NOT DECIDED"]
                ]
            );


        const candidateAreaDifference =
            Math.abs(
                candidateArea -
                refArea
            ) /
            refArea *
            100;


        const humanAreaDifference =
            Math.abs(
                humanArea -
                refArea
            ) /
            refArea *
            100;


        document.getElementById(
            "comparison-difference"
        ).innerHTML = `

            <div class="grid grid-cols-4 gap-3">

                <div class="bg-slate-900 p-3 rounded border border-slate-800">
                    <div class="text-[10px] text-slate-500">AI → Reference Area</div>
                    <div class="text-lg font-bold text-amber-400 mt-1">
                        ${candidateAreaDifference.toFixed(2)}%
                    </div>
                </div>

                <div class="bg-slate-900 p-3 rounded border border-slate-800">
                    <div class="text-[10px] text-slate-500">Human → Reference Area</div>
                    <div class="text-lg font-bold text-emerald-400 mt-1">
                        ${humanAreaDifference.toFixed(2)}%
                    </div>
                </div>

                <div class="bg-slate-900 p-3 rounded border border-slate-800">
                    <div class="text-[10px] text-slate-500">AI Area Difference</div>
                    <div class="text-lg font-bold text-white mt-1">
                        ${Math.abs(candidateArea - refArea).toFixed(2)} m²
                    </div>
                </div>

                <div class="bg-slate-900 p-3 rounded border border-slate-800">
                    <div class="text-[10px] text-slate-500">Reviewed Area Difference</div>
                    <div class="text-lg font-bold text-emerald-400 mt-1">
                        ${Math.abs(humanArea - refArea).toFixed(2)} m²
                    </div>
                </div>

            </div>

            <div class="mt-4 text-[11px] text-slate-400">
                The comparison is intended to support technical review. It does not by itself determine legal correctness.
            </div>

        `;

    }


    function comparisonBlock(rows) {

        return `

            <div class="space-y-2 text-xs">

                ${rows.map(
                    ([key,value]) => `

                        <div class="flex justify-between border-b border-slate-800 pb-1.5">

                            <span class="text-slate-400">
                                ${key}
                            </span>

                            <span class="font-mono text-white">
                                ${value}
                            </span>

                        </div>

                    `
                ).join("")}

            </div>

        `;

    }


    /* =========================================================
       MANUAL PANEL
    ========================================================== */

    function renderManualPanel() {

        const manualParcels =
            Object.values(
                parcelsData
            ).filter(
                p =>
                    p.decision === "MANUAL INSPECTION"
            );


        if (manualParcels.length === 0) {

            document.getElementById(
                "manual-panel"
            ).innerHTML = `

                <div class="bg-gis-800 border border-slate-800 rounded-xl p-8 text-center text-slate-500 text-xs">

                    No parcels are currently waiting for manual inspection.

                </div>

            `;

            return;

        }


        document.getElementById(
            "manual-panel"
        ).innerHTML =
            manualParcels.map(
                p => `

                    <div class="bg-gis-800 rounded-xl border border-amber-900/50 p-4 space-y-3">

                        <div class="flex justify-between items-center border-b border-slate-700 pb-3">

                            <div>

                                <span class="text-xs font-mono text-sky-400 font-bold">
                                    ${p.id}
                                </span>

                                <div class="text-xs text-slate-300 mt-0.5">
                                    Reason: ${p.manualInspection?.reason || p.decisionReason}
                                </div>

                            </div>

                            <span class="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold px-2 py-1 rounded">
                                ${p.manualInspection?.status || "DISPATCHED"}
                            </span>

                        </div>

                        <div class="grid grid-cols-3 gap-3 text-xs">

                            <div>
                                <span class="text-slate-500">
                                    Device
                                </span>

                                <div class="font-mono text-white mt-1">
                                    ${p.device}
                                </div>
                            </div>

                            <div>
                                <span class="text-slate-500">
                                    Priority
                                </span>

                                <div class="font-bold text-amber-400 mt-1">
                                    ${p.manualInspection?.priority || "Normal"}
                                </div>
                            </div>

                            <div>
                                <span class="text-slate-500">
                                    Instructions
                                </span>

                                <div class="text-white mt-1">
                                    ${p.manualInspection?.instructions || p.decisionComment}
                                </div>
                            </div>

                        </div>

                        <button
                            onclick="selectParcel('${p.id}')"
                            class="bg-sky-600 hover:bg-sky-500 text-white px-3 py-2 rounded text-xs font-semibold">

                            Open Parcel

                        </button>

                    </div>

                `
            )
            .join("");

    }


    /* =========================================================
       DASHBOARD
    ========================================================== */

    function renderDashboard() {

        const parcels =
            Object.values(
                parcelsData
            );


        const approved =
            parcels.filter(
                p =>
                    p.decision === "APPROVED"
            ).length;


        const rejected =
            parcels.filter(
                p =>
                    p.decision === "REJECTED" ||
                    p.decision === "DENIED"
            ).length;


        const manual =
            parcels.filter(
                p =>
                    p.decision === "MANUAL INSPECTION"
            ).length;


        const review =
            parcels.filter(
                p =>
                    !p.decision
            ).length;


        document.getElementById(
            "kpi-received"
        ).textContent =
            parcels.length;


        document.getElementById(
            "kpi-approved"
        ).textContent =
            approved;


        document.getElementById(
            "kpi-review"
        ).textContent =
            review;


        document.getElementById(
            "kpi-manual"
        ).textContent =
            manual + rejected;


        document.getElementById(
            "approved-count"
        ).textContent =
            approved;


        document.getElementById(
            "rejected-count"
        ).textContent =
            rejected;


        document.getElementById(
            "manual-count"
        ).textContent =
            manual;


        document.getElementById(
            "queue-count"
        ).textContent =
            review;


        document.getElementById(
            "dashboard-table-body"
        ).innerHTML =
            parcels
                .map(
                    p => {

                        const decision =
                            p.decision ||
                            "UNDER REVIEW";


                        const decisionColor =
                            decision === "APPROVED"
                                ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                                : decision === "REJECTED"
                                    ? "bg-orange-950 text-orange-400 border-orange-800"
                                    : decision === "DENIED"
                                        ? "bg-rose-950 text-rose-400 border-rose-800"
                                        : decision === "MANUAL INSPECTION"
                                            ? "bg-amber-950 text-amber-400 border-amber-800"
                                            : "bg-slate-900 text-slate-400 border-slate-700";


                        return `

                        <tr class="hover:bg-slate-700/30 transition">

                            <td class="p-3 font-bold text-sky-400">
                                ${p.id}
                            </td>

                            <td class="p-3 text-slate-400">
                                ${p.device}
                            </td>

                            <td class="p-3">
                                ${p.area.toFixed(2)}
                            </td>

                            <td class="p-3 ${p.aiConfidence >= 85 ? "text-emerald-400" : "text-rose-400"}">
                                ${p.aiConfidence.toFixed(1)}%
                            </td>

                            <td class="p-3">

                                <span
                                    class="${decisionColor} border px-2 py-0.5 rounded text-[10px]">
                                    ${decision}
                                </span>

                            </td>

                            <td class="p-3 text-slate-500">
                                ${p.captureDate}
                            </td>

                            <td class="p-3 text-right">

                                <button
                                    onclick="selectParcel('${p.id}')"
                                    class="bg-sky-600 hover:bg-sky-500 text-white px-2.5 py-1 rounded text-[11px] font-sans">
                                    Inspect
                                </button>

                            </td>

                        </tr>

                        `;

                    }
                )
                .join("");

    }


    /* =========================================================
       QUEUE
    ========================================================== */

    function renderQueue() {

        const parcels =
            Object.values(
                parcelsData
            );


        document.getElementById(
            "queue-grid"
        ).innerHTML =
            parcels.map(
                p => {

                    const status =
                        p.decision ||
                        "UNDER REVIEW";


                    const color =
                        status === "APPROVED"
                            ? "border-emerald-900/50"
                            : status === "REJECTED"
                                ? "border-orange-900/50"
                                : status === "DENIED"
                                    ? "border-rose-900/50"
                                    : status === "MANUAL INSPECTION"
                                        ? "border-amber-900/50"
                                        : "border-slate-800";


                    return `

                    <div class="bg-gis-800 border ${color} p-4 rounded-xl space-y-3">

                        <div class="flex justify-between items-start">

                            <div>

                                <span class="text-xs text-slate-400">
                                    Parcel ID
                                </span>

                                <h3 class="text-lg font-bold text-sky-400 font-mono">
                                    ${p.id}
                                </h3>

                            </div>

                            <span class="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                                ${status}
                            </span>

                        </div>


                        <div class="text-xs space-y-1 text-slate-300">

                            <div class="flex justify-between">
                                <span>Area:</span>
                                <span class="font-mono">
                                    ${p.area.toFixed(2)} m²
                                </span>
                            </div>

                            <div class="flex justify-between">
                                <span>Confidence:</span>
                                <span class="font-mono">
                                    ${p.aiConfidence.toFixed(1)}%
                                </span>
                            </div>

                            <div class="flex justify-between">
                                <span>Reference:</span>
                                <span class="font-mono text-blue-400">
                                    ${p.referenceId}
                                </span>
                            </div>

                            <div class="flex justify-between">
                                <span>Device:</span>
                                <span class="font-mono">
                                    ${p.device}
                                </span>
                            </div>

                        </div>


                        <button
                            onclick="selectParcel('${p.id}')"
                            class="w-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold py-2 rounded-lg transition">

                            Load into Workstation

                        </button>

                    </div>

                    `;

                }
            )
            .join("");

    }


    /* =========================================================
       AUDIT LOG
    ========================================================== */

    function addAuditLog(
        parcelId,
        action
    ) {

        const timestamp =
            new Date()
                .toLocaleTimeString();


        const entry =
            document.createElement(
                "div"
            );


        entry.className =
            "flex gap-4 border-b border-slate-800 pb-2 text-slate-400";


        entry.innerHTML = `

            <span class="text-slate-500">
                ${timestamp}
            </span>

            <span class="text-sky-400 font-bold">
                ${parcelId}
            </span>

            <span>
                ${action}
            </span>

        `;


        document.getElementById(
            "audit-log-container"
        ).prepend(
            entry
        );

    }


    function clearAuditLog() {

        document.getElementById(
            "audit-log-container"
        ).innerHTML = "";

        addAuditLog(
            "-",
            "Demo audit log cleared"
        );

    }


    /* =========================================================
       GLOBAL RENDER
    ========================================================== */

    function renderAll() {

        const data =
            parcelsData[activeParcelId];


        document.getElementById(
            "top-parcel-id"
        ).textContent =
            data.id;


        document.getElementById(
            "top-device-id"
        ).textContent =
            data.device;


        updateTopStatus();

        renderMetadata();

        renderDashboard();

        renderQueue();

        renderReference();

        renderComparison();

        renderManualPanel();

        runValidation();

        lucide.createIcons();

    }


/* =========================================================
   UX SAFETY / DEMO CONTROLS
   ========================================================= */

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    closeReceiveModal();
    closeDecisionModal();
    closeManualModal();

    const transmit = document.getElementById("modal-transmit");
    if (transmit && !transmit.classList.contains("hidden")) {
        transmit.classList.add("hidden");
    }
});

["modal-receive", "modal-decision", "modal-manual"].forEach((id) => {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.addEventListener("click", (event) => {
        if (event.target !== modal) return;

        if (id === "modal-receive") closeReceiveModal();
        if (id === "modal-decision") closeDecisionModal();
        if (id === "modal-manual") closeManualModal();
    });
});
