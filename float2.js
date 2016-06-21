

function isNumber(n) : boolean {
	return typeof (n) === 'number';
}
function assertNumber(n) : number {
	if (!isNumber(n)) throw new Error(`not a number: ${n}`);
	return n;
}

const Epsilon = Number.EPSILON

interface Float2Type {x: number, y: number}

export function as(json: Float2Type) : Float2 {
	return fromJson(json)
}
export function is(json: Float2Type) : boolean {
	return isNumber(json.x) && isNumber(json.y)
}

export function fromJson(json: Float2Type) : Float2 {
	assertNumber(json.x)
	assertNumber(json.y)
	return new Float2(json.x, json.y);
}
export function vec(x: number, y: number): Float2 {
	return new Float2(x, y)
}


export function dot(a: Float2Type, b: Float2Type): number {
	return (a.x * b.x) + (a.y * b.y)
}
export function dotFlat(ax: number, ay: number, bx: number, by: number): number {
	return (ax * bx) + (ay * by)
}
export function distance(a: Float2Type, b: Float2Type): number {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return Math.sqrt((dx * dx) + (dy * dy));
}
export function distanceSquared(a: Float2Type, b: Float2Type): number {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return (dx * dx) + (dy * dy);
}
export function magSquaredFlat(x: number, y: number): number {
	return (x * x) + (y * y);
}
export function magFlat(x: number, y: number): number {
	return Math.sqrt((x * x) + (y * y));
}
export function mag(p: Float2Type): number {
	return Math.sqrt((p.x * p.x) + (p.y * p.y));
}
export class Float2 {
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	
	
	set(v: Float2Type): Float2 {
		this.x = v.x
		this.y = v.y
		return this
	}

	isZero(): boolean {
		return Math.abs(this.x) < Epsilon && Math.abs(this.y) < Epsilon;
	}
	toString(): string {
		return `${this.x},${this.y}`
	}
	toShortString(): string {
		return `${this.x.toFixed(2)},${this.y.toFixed(2)}`
	}
	toArray(): number[] {
		return [this.x, this.y]
	}
	equals(v): boolean {
		return (Math.abs(v.x - this.x) < Epsilon) && (Math.abs(v.y - this.y) < Epsilon);
	}
	copy(): Float2 {
		return Float2.vec(this.x, this.y)
	}
	mag(): number {
		return Float2.mag(this)
	}
	magSquared(): number {
		return (this.x * this.x) + (this.y * this.y);
	}
	distance(p: Float2Type): number {
		return Float2.distance(this, p)
	}
	distanceSquared(p: Float2Type) : number {
		return Float2.distanceSquared(this, p)
	}
	distanceFlat(x: number, y: number): number {
		const dx = this.x - x, dy = this.y - y;
		return Math.sqrt((dx * dx) + (dy * dy));
	}
	distanceSquaredFlat(x: number, y: number): number {
		const dx = this.x - x, dy = this.y - y;
		return (dx * dx) + (dy * dy)
	}
	min(v: Float2Type): Float2 {
		this.x = Math.min(this.x, v.x)
		this.y = Math.min(this.y, v.y)
		return this
	}
	max(v: Float2Type): Float2 {
		this.x = Math.max(this.x, v.x)
		this.y = Math.max(this.y, v.y)
		return this
	}
	floor(): Float2 {
		this.x = Math.floor(this.x)
		this.y = Math.floor(this.y)
		return this
	}
	ceil(): Float2 {
		this.x = Math.ceil(this.x)
		this.y = Math.ceil(this.y)
		return this
	}
	abs() : Float2 {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this
	}
	sub(v: Float2) {
		this.x -= v.x
		this.y -= v.y
		return this
	}
	area() {
		return this.x * this.y
	}
	add(v: Float2Type): Float2 {
		this.x += v.x
		this.y += v.y
		return this
	}
	addScaled(s: number, v: Float2Type): Float2 {
		this.x += s * v.x
		this.y += s * v.y
		return this
	}
	addMultiplied(s: Float2Type, v: Float2Type): Float2 {
		this.x += s.x * v.x
		this.y += s.y * v.y
		return this
	}
	addFlat(x: number, y: number): Float2 {
		this.x += x
		this.y += y
		return this
	}
	scale(v: number) {
		this.x *= v
		this.y *= v
		return this
	}
	multiply(v: Float2Type) : Float2 {
		this.x *= v.x;
		this.y *= v.y;
		return this
	}
	multiplyFlat(x: number, y: number) : Float2 {
		this.x *= x
		this.y *= y
		return this
	}
	divide(v : Float2Type) : Float2 {
		this.x /= v.x
		this.y /= v.y
		return this
	}
	negate() : Float2 {
		this.x = -this.x
		this.y = -this.y
		return this
	}
	normalize(): Float2 {
		const s = 1 / this.mag()
		this.x *= s
		this.y *= s
		return this
	}
	invert(): Float2 {
		if (Math.abs(this.x) < Epsilon) throw new Error(`cannot invert, x is zero: ${this}`);
		if (Math.abs(this.y) < Epsilon) throw new Error(`cannot invert, y is zero: ${this}`);
		this.x = 1 / this.x;
		this.y = 1 / this.y;
		return this;
	}
	addX(v: number): Float2 {
		this.x += v
		return this
	}	
	addY(v:number) : Float2 {
		this.y += v
		return this
	}		
	setFlat(x: number, y: number): Float2 {
		this.x = x;
		this.y = y;
		return this;
	}
	setX(v:number) : Float2 {
		this.x = v
		return this
	}
	setY(v:number) :Float2 {
		this.y = v
		return this
	}

	isOk(): boolean {
		return !isNaN(this.x) && !isNaN(this.y);
	}
	
	assertOk() : Float2 {
		if (!this.isOk()) throw new Error(`not ok: ${this}`)
		return this		
	}
	assertPositive() : Float2 {
		if(!this.isPositive(this)) throw new Error(`not positive ${this}`)
		return this
	}
	isLessThan(p: Float2Type): Float2 {
		return this.x < p.x && this.y < p.y;
	}
	isInt(): boolean {
		return ((this.x | 0) === this.x) && ((this.y | 0) === this.y);
	}
	isUnit(): boolean {
		return Math.abs(1-this.mag()) > Epsilon;	
	}
	assertInts(): Float2 {
		if(!this.isInt()) throw new Error(`not ints: ${this}`);
		return this;
	}
	assertUnit() : Float2 {
		if(!this.isUnit()) throw new Error(`not a unit vector: ${this}`)
		return this
	}
	isGreaterThan(p : Float2Type) : boolean {
		return this.x > p.x && this.y > p.y
	}
	isPositive() : boolean {
		return this.x >= 0 && this.y >= 0;
	}
	dot(v: Float2Type): number {
		return Float2.dot(this, v);
	}
	dotFlat(vx: number, vy: number): number {
		return Float2.dotFlat(this.x, this.y, vx, vy);
	}
}
