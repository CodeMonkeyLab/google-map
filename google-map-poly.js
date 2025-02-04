import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';
import './google-map-point.js';

Polymer({
  _template: html`
    <style>
      :host {
        display: none;
      }
    </style>

    <slot id="points"></slot>
`,

  is: 'google-map-poly',

  /**
   * Fired when the `path` property is built based on child `google-map-point` elements, either
   * initially or when they are changed.
   *
   * @event google-map-poly-path-built
   * @param {google.maps.MVCArray.<LatLng>} path The poly path.
   */

  /**
   * Fired when the user finishes adding vertices to the poly. The host component can use the
   * provided path to rebuild its list of points.
   *
   * @event google-map-poly-path-updated
   * @param {google.maps.MVCArray.<LatLng>} path The poly path.
   */

  /**
   * Fired when the DOM `click` event is fired on the poly. Requires the clickEvents and clickable attribute to
   * be true.
   *
   * @event google-map-poly-click
   * @param {google.maps.PolyMouseEvent} event The poly event.
   */

  /**
   * Fired when the DOM `dblclick` event is fired on the poly. Requires the clickEvents and clickable attribute
   * to be true.
   *
   * @event google-map-poly-dblclick
   * @param {google.maps.PolyMouseEvent} event The poly event.
   */

  /**
   * Fired repeatedly while the user drags the poly. Requires the dragEvents attribute to be true.
   *
   * @event google-map-poly-drag
   * @param {google.maps.MouseEvent} event The mouse event.
   */

  /**
   * Fired when the user stops dragging the poly. Requires the dragEvents attribute to be true.
   *
   * @event google-map-poly-dragend
   * @param {google.maps.MouseEvent} event The mouse event.
   */

  /**
   * Fired when the user starts dragging the poly. Requires the dragEvents attribute to be true.
   *
   * @event google-map-poly-dragstart
   * @param {google.maps.MouseEvent} event The mouse event.
   */

  /**
   * Fired when the DOM `mousedown` event is fired on the poly. Requires the mouseEvents attribute
   * to be true.
   *
   * @event google-map-poly-mousedown
   * @param {google.maps.PolyMouseEvent} event The poly event.
   */

  /**
   * Fired when the DOM `mousemove` event is fired on the poly. Requires the mouseEvents attribute
   * to be true.
   *
   * @event google-map-poly-mousemove
   * @param {google.maps.PolyMouseEvent} event The poly event.
   */

  /**
   * Fired on poly mouseout. Requires the mouseEvents attribute to be true.
   *
   * @event google-map-poly-mouseout
   * @param {google.maps.PolyMouseEvent} event The poly event.
   */

  /**
   * Fired on poly mouseover. Requires the mouseEvents attribute to be true.
   *
   * @event google-map-poly-mouseover
   * @param {google.maps.PolyMouseEvent} event The poly event.
   */

  /**
   * Fired when the DOM `mouseup` event is fired on the poly. Requires the mouseEvents attribute
   * to be true.
   *
   * @event google-map-poly-mouseup
   * @param {google.maps.PolyMouseEvent} event The poly event.
   */

  /**
   * Fired when the poly is right-clicked on. Requires the clickEvents attribute to be true.
   *
   * @event google-map-poly-rightclick
   * @param {google.maps.PolyMouseEvent} event The poly event.
   */

  /**
   * Polymer properties for the google-map-poly element.
   */
  properties: {
    /**
     * A Google Maps polyline or polygon object (depending on value of "closed" attribute).
     *
     * @type {google.maps.Polyline|google.maps.Polygon}
     */
    poly: {
      type: Object,
      readOnly: true,
    },

    /**
     * An array of the Google Maps LatLng objects that define the poly shape.
     *
     * @type google.maps.MVCArray.<LatLng>
     */
    path: {
      type: Object,
      readOnly: true,
    },

    /**
     * The Google map object.
     *
     * @type google.maps.Map
     */
    map: {
      type: Object,
      observer: '_mapChanged',
    },

    /**
     * When true, the poly will generate mouse events.
     */
    clickable: {
      type: Boolean,
      value: false,
      observer: '_clickableChanged',
    },

    /**
     * When true, the google-map-poly-*click events will be automatically registered.
     */
    clickEvents: {
      type: Boolean,
      value: false,
      observer: '_clickEventsChanged',
    },

    /**
     * When true, the path will be closed by connecting the last point to the first one and
     * treating the poly as a polygon.
     */
    closed: {
      type: Boolean,
      value: false,
      observer: '_closedChanged',
    },

    /**
     * When true, the google-map-poly-drag* events will be automatically registered.
     */
    dragEvents: {
      type: Boolean,
      value: false,
      observer: '_dragEventsChanged',
    },

    /**
     * When true, the poly's vertices may be individually moved or new ones added.
     */
    editable: {
      type: Boolean,
      value: false,
      observer: '_editableChanged',
    },

    /**
     * When true, indicates that the user has begun editing the poly path (adding vertices).
     */
    editing: {
      type: Boolean,
      value: false,
      notify: true,
      readOnly: true,
    },

    /**
     * If the path is closed, the polygon fill color. All CSS3 colors are supported except for
     * extended named colors.
     */
    fillColor: {
      type: String,
      value: '',
      observer: '_fillColorChanged',
    },

    /**
     * If the path is closed, the polygon fill opacity (between 0.0 and 1.0).
     */
    fillOpacity: {
      type: Number,
      value: 0,
      observer: '_fillOpacityChanged',
    },

    /**
     * When true, the poly's edges are interpreted as geodesic and will follow the curvature of
     * the Earth. When not set, the poly's edges are rendered as straight lines in screen space.
     * Note that the poly of a geodesic poly may appear to change when dragged, as the dimensions
     * are maintained relative to the surface of the earth.
     */
    geodesic: {
      type: Boolean,
      value: false,
      observer: '_geodesicChanged',
    },

    /**
     * If the path is not closed, the icons to be rendered along the polyline.
     */
    icons: {
      type: Array,
      value: null,
      observer: '_iconsChanged',
    },

    /**
     * When true, the google-map-poly-mouse* events will be automatically registered.
     */
    mouseEvents: {
      type: Boolean,
      value: false,
      observer: '_mouseEventsChanged',
    },

    /**
     * The color to draw the poly's stroke with. All CSS3 colors are supported except for extended
     * named colors.
     */
    strokeColor: {
      type: String,
      value: 'black',
      observer: '_strokeColorChanged',
    },

    /**
     * The stroke opacity (between 0.0 and 1.0).
     */
    strokeOpacity: {
      type: Number,
      value: 1,
      observer: '_strokeOpacityChanged',
    },

    /**
     * The stroke position (center, inside, or outside).
     */
    strokePosition: {
      type: String,
      value: 'center',
      observer: '_strokePositionChanged',
    },

    /**
     * The stroke width in pixels.
     */
    strokeWeight: {
      type: Number,
      value: 3,
      observer: '_strokeWeightChanged',
    },

    /**
     * The Z-index relative to other objects on the map.
     */
    zIndex: {
      type: Number,
      value: 0,
      observer: '_zIndexChanged',
    },
  },

  // Lifecycle event handlers.

  detached() {
    if(this.poly) {
      this._listeners = {};
      this.poly.setMap(null);
    }
    if (this._pointsObserver) {
      this._pointsObserver.disconnect();
      this._pointsObserver = null;
    } 
  },

  attached() {
    // If element is added back to DOM, put it back on the map.
    this.poly && this.poly.setMap(this.map);
  },

  // Attribute/property change watchers.

  attributeChanged(attrName) {
    if (!this.poly) {
      return;
    }

    // Cannot use *Changed watchers for native properties.
    switch (attrName) {
      case 'hidden':
        this.poly.setVisible(!this.hidden);
        break;
      case 'draggable':
        this.poly.setDraggable(this.draggable);
        break;
    }
  },

  _clickableChanged() {
    this.poly && this.poly.set('clickable', this.clickable);
  },

  _clickEventsChanged() {
    if (this.poly) {
      if (this.clickEvents) {
        this._forwardEvent('click');
        this._forwardEvent('dblclick');
        this._forwardEvent('rightclick');
      } else {
        this._clearListener('click');
        this._clearListener('dblclick');
        this._clearListener('rightclick');
      }
    }
  },

  _closedChanged() {
    this._mapChanged();
  },

  _dragEventsChanged() {
    if (this.poly) {
      if (this.clickEvents) {
        this._forwardEvent('drag');
        this._forwardEvent('dragend');
        this._forwardEvent('dragstart');
      } else {
        this._clearListener('drag');
        this._clearListener('dragend');
        this._clearListener('dragstart');
      }
    }
  },

  _editableChanged() {
    this.poly && this.poly.setEditable(this.editable);
  },

  _fillColorChanged() {
    this.poly && this.poly.set('fillColor', this.fillColor);
  },

  _fillOpacityChanged() {
    this.poly && this.poly.set('fillOpacity', this.fillOpacity);
  },

  _geodesicChanged() {
    this.poly && this.poly.set('geodesic', this.geodesic);
  },

  _iconsChanged() {
    this.poly && this.poly.set('icons', this.icons);
  },

  _mapChanged() {
    // Poly will be rebuilt, so disconnect existing one from old map and listeners.
    if (this.poly) {
      this.poly.setMap(null);
      google.maps.event.clearInstanceListeners(this.poly);
    }

    if (this.map && this.map instanceof google.maps.Map) {
      this._createPoly();
    }
  },

  _mouseEventsChanged() {
    if (this.poly) {
      if (this.mouseEvents) {
        this._forwardEvent('mousedown');
        this._forwardEvent('mousemove');
        this._forwardEvent('mouseout');
        this._forwardEvent('mouseover');
        this._forwardEvent('mouseup');
      } else {
        this._clearListener('mousedown');
        this._clearListener('mousemove');
        this._clearListener('mouseout');
        this._clearListener('mouseover');
        this._clearListener('mouseup');
      }
    }
  },

  _strokeColorChanged() {
    this.poly && this.poly.set('strokeColor', this.strokeColor);
  },

  _strokeOpacityChanged() {
    this.poly && this.poly.set('strokeOpacity', this.strokeOpacity);
  },

  _strokePositionChanged() {
    this.poly && this.poly.set('strokePosition', this._convertStrokePosition());
  },

  _strokeWeightChanged() {
    this.poly && this.poly.set('strokeWeight', this.strokeWeight);
  },

  _zIndexChanged() {
    this.poly && this.poly.set('zIndex', this.zIndex);
  },

  // Helper logic.

  _buildPathFromPoints() {
    this._points = Array.prototype.slice.call(this.$.points.assignedNodes({ flatten: true }))
      .filter(n => n.nodeName !== '#text');

    // Build path from current points (ignoring vertex insertions while doing so).
    this._building = true;
    this.path.clear();
    for (var i = 0, point; point = this._points[i]; ++i) {
      let tagName = point.tagName;

      if (tagName) {
        tagName = tagName.toLowerCase();

        if (tagName == 'google-map-point') {
          this.path.push(point.getPosition());
        }
      }
    }
    this._building = false;

    this.fire('google-map-poly-path-built', this.path);

    // Watch for future updates.
    if (this._pointsObserver) {
      return;
    }
    this._pointsObserver = new MutationObserver(this._buildPathFromPoints.bind(this));
    this._pointsObserver.observe(this, {
      subtree: true,
      attributes: true,
    });
  },

  _clearListener(name) {
    if (this._listeners[name]) {
      google.maps.event.removeListener(this._listeners[name]);
      this._listeners[name] = null;
    }
  },

  _convertStrokePosition() {
    return google.maps.StrokePosition && this.strokePosition ?
      google.maps.StrokePosition[this.strokePosition.toUpperCase()] : 0;
  },

  _createPoly() {
    // Build poly's path and register mutation listeners on first creation.
    if (!this.path) {
      this._setPath(new google.maps.MVCArray());
      google.maps.event.addListener(this.path, 'insert_at', this._startEditing.bind(this));
      google.maps.event.addListener(this.path, 'set_at', this._updatePoint.bind(this));
      this._buildPathFromPoints();
    }

    const options = {
      clickable: this.clickable || this.draggable, // draggable must be clickable to work.
      draggable: this.draggable,
      editable: this.editable,
      geodesic: this.geodesic,
      map: this.map,
      path: this.path,
      strokeColor: this.strokeColor,
      strokeOpacity: this.strokeOpacity,
      strokePosition: this._convertStrokePosition(),
      strokeWeight: this.strokeWeight,
      visible: !this.hidden,
      zIndex: this.zIndex,
    };

    if (this.closed) {
      options.fillColor = this.fillColor;
      options.fillOpacity = this.fillOpacity;
      this._setPoly(new google.maps.Polygon(options));
    } else {
      options.icons = this.icons;
      this._setPoly(new google.maps.Polyline(options));
    }

    this._listeners = {};
    this._clickEventsChanged();
    this._mouseEventsChanged();
    this._dragEventsChanged();
  },

  _forwardEvent(name) {
    this._listeners[name] = google.maps.event.addListener(this.poly, name, (event) => {
      this.fire(`google-map-poly-${name}`, event);
    });
  },

  _startEditing(index) {
    if (this._building) {
      // Ignore changes while building path.
      return;
    }

    // Signal start of editing when first vertex inserted, end when map clicked.
    if (!this.editing) {
      this._setEditing(true);
      // The poly path and google-map-point elements lose sync once the user starts adding points,
      // so invalidate the _points array.
      this._points = null;
      google.maps.event.addListenerOnce(this.map, 'click', () => {
        this._setEditing(false);
        this.fire('google-map-poly-path-updated', this.path);
      });
    }
  },

  _updatePoint(index, vertex) {
    // Ignore changes if path is out of sync with google-map-point elements.
    if (!this._points) {
      return;
    }

    // Update existing point so bound properties are updated. too.
    this._points[index].latitude = vertex.lat();
    this._points[index].longitude = vertex.lng();
  },
});
