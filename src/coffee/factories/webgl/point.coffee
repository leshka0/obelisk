class Point extends Factory

	constructor: ( Scene ) ->

		create = ( size, color = 0xFF0000 ) ->

			geometry = new THREE.SphereGeometry( size, 4, 4)
			mesh 	 = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color:0xFF0000, wireframe: true }))

			return mesh

		return {
			create: create
		}