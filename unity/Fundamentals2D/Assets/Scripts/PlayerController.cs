using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour {

    Rigidbody2D _rigidBody;
    SpriteRenderer _renderer;
    Animator _animator;

    public float maxSpeed;
    bool facingRight = true;

	// Use this for initialization
	void Start () {
        this._rigidBody = GetComponent<Rigidbody2D>();
        this._renderer = GetComponent<SpriteRenderer>();
        this._animator = GetComponent<Animator>();
	}
	
	// Update is called once per frame
	void Update () {
        var move = Input.GetAxis("Horizontal");

        if(move > 0 && !facingRight){
            Flip();
        }
        else if (move < 0 && facingRight)
        {
            Flip();
        }

        this._rigidBody.velocity = new Vector2(move * maxSpeed, this._rigidBody.velocity.y);
        this._animator.SetFloat("MoveSpeed",Mathf.Abs(move));
	}

    void Flip(){
        facingRight = !facingRight;
        this._renderer.flipX = !this._renderer.flipX;
    }
}
