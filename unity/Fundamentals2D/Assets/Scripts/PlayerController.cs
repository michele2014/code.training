using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour {

    Rigidbody2D _rigidBody;
    SpriteRenderer _renderer;
    Animator _animator;

    bool canMove = true;
    bool facingRight = true;
    //move
    public float maxSpeed;
    //jump
    bool grounded = false;
    float groundCheckRadius = 0.2f;

    public LayerMask groundLayer;
    public Transform groundCheck;
    public float jumpPower;

	// Use this for initialization
	void Start () {
        this._rigidBody = GetComponent<Rigidbody2D>();
        this._renderer = GetComponent<SpriteRenderer>();
        this._animator = GetComponent<Animator>();
	}
	
	// Update is called once per frame
	void Update () {
        //JUMP
        if(canMove && grounded && Input.GetAxis("Jump") > 0){
            this._animator.SetBool("IsGrounded", false);
            this._rigidBody.velocity = new Vector2(this._rigidBody.velocity.x, 0f);
            this._rigidBody.AddForce(new Vector2(0f, jumpPower), ForceMode2D.Impulse);
            grounded = false;
        }

        grounded = Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, groundLayer);
        this._animator.SetBool("IsGrounded", grounded);

        //MOVE
        var move = Input.GetAxis("Horizontal");

        if(canMove){
            if (move > 0 && !facingRight)
            {
                Flip();
            }
            else if (move < 0 && facingRight)
            {
                Flip();
            }

            this._rigidBody.velocity = new Vector2(move * maxSpeed, this._rigidBody.velocity.y);
            this._animator.SetFloat("MoveSpeed", Mathf.Abs(move));
        }
        else{
            this._rigidBody.velocity = new Vector2(0, this._rigidBody.velocity.y);
            this._animator.SetFloat("MoveSpeed", 0);
        }
	}

    void Flip(){
        facingRight = !facingRight;
        this._renderer.flipX = !this._renderer.flipX;
    }

    public void ToggleCanMove(){
        this.canMove = !this.canMove;
    }
}
